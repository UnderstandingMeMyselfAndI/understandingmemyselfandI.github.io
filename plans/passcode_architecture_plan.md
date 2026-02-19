# Passcode Feature Architecture Plan (Revised)

The architecture has been revised based on the requirement that session-related state variables must be held in memory
(Zustand state) and **not** persisted to IndexedDB/localStorage to prevent tampering. Only the hashed credentials and
setup status will be persisted.

## 1. Store Modifications (`src/store/useAppStore.js`)

We need to introduce state variables for session management that are _not_ persisted, alongside the required persisted
credentials.

### 1.1 State Variables Summary

| Variable Name           | Type      | Initial Value | Persistence         | Purpose                                  |
| :---------------------- | :-------- | :------------ | :------------------ | :--------------------------------------- |
| `passcodeHash`          | `string`  | `""`          | **YES** (IndexedDB) | Hashed passcode.                         |
| `passcodeSalt`          | `string`  | `""`          | **YES** (IndexedDB) | Salt for hashing.                        |
| `hasPasscode`           | `boolean` | `false`       | **YES** (IndexedDB) | True if setup was completed.             |
| `isPasscodeVerified`    | `boolean` | `false`       | **NO** (In-Memory)  | Current session unlocked status.         |
| `passcodeVerifiedUntil` | `number`  | `0`           | **NO** (In-Memory)  | Session expiry timestamp (e.g., 30 min). |
| `failedAttempts`        | `number`  | `0`           | **NO** (In-Memory)  | Failed attempt counter (max 10).         |
| `lockoutUntil`          | `number`  | `0`           | **NO** (In-Memory)  | Lockout expiry timestamp (5 min).        |

### 1.2 New/Modified Actions

1.  **`setPasscode(newPasscode)`:**
    - Calculate hash/salt.
    - Set persisted state: `passcodeHash`, `passcodeSalt`, `hasPasscode: true`.
    - Set in-memory state: `isPasscodeVerified: true`, `failedAttempts: 0`, `lockoutUntil: 0`.
    - Set `passcodeVerifiedUntil` to `Date.now() + SESSION_DURATION_MS`.
2.  **`verifyPasscode(inputPasscode)`:**
    - Check `lockoutUntil`. If active, return `false`.
    - Verify hash/salt using persisted values.
    - **On Success:** Set in-memory state: `isPasscodeVerified: true`, update `passcodeVerifiedUntil`, reset
      `failedAttempts: 0`. Return `true`.
    - **On Failure:** Increment `failedAttempts`. If `failedAttempts > 10`, set `lockoutUntil` to
      `Date.now() + 5_MINUTES_MS`. Return `false`.
3.  **`changePasscode(oldPasscode, newPasscode)`:** New action.
    - Call `verifyPasscode(oldPasscode)`.
    - If true, call `setPasscode(newPasscode)` (which handles setting in-memory state correctly).
    - If false, return error/false.
4.  **`resetPasscode()`:** (Existing logic needs expansion)
    - Clear persisted state: `passcodeHash`, `passcodeSalt`, `hasPasscode`.
    - Clear in-memory state: `isPasscodeVerified: false`, `failedAttempts: 0`, `lockoutUntil: 0`,
      `passcodeVerifiedUntil: 0`.
5.  **`clearSessionState()`:** New action.
    - Clears only in-memory session state: `isPasscodeVerified: false`, `passcodeVerifiedUntil: 0`, `failedAttempts: 0`,
      `lockoutUntil: 0`. This handles screen timeouts/component unmounts.
6.  **`clearProtectedData()`:** New action.
    - Calls data clearing actions for protected components.
    - Calls `resetPasscode()`.
7.  **`clearIDB`:** (Update existing logic)
    - Must call `resetPasscode()` before clearing IDB to ensure all state is reset.

## 2. Component Architecture

### 2.1 `PasscodeDialog` Component (New)

Handles UI for **Creation**, **Verification**, and **Reset**.

- **Input:** 4 visual fields, numeric-only input (0-9).
- **Feedback:** A single, dedicated element for all user messages (non-numeric error, validation success/fail, attempt
  count, lockout message).
- **Validation:** Triggers store actions upon 4th digit entry.

### 2.2 `PasscodeGate` Component/Hook (New)

Wrapper for protected components (`WheelOfLife`, `QuizStats`, `DaysCounter`).

**Logic:**

1.  If `!hasPasscode`, render content directly.
2.  If `isPasscodeVerified` AND `Date.now() < passcodeVerifiedUntil`, render protected content.
3.  If verification needed:
    - If `lockoutUntil > Date.now()`, render Lockout UI (within Dialog).
    - Otherwise, render `PasscodeDialog` to prompt for entry. Upon success, it calls `clearSessionState()` implicitly
      via the success path in `verifyPasscode` or explicitly calls `clearSessionState()` if the dialog handles success
      internally. _Refinement: The dialog should call `verifyPasscode` and if successful, the store action handles
      setting `isPasscodeVerified=true` and updating `passcodeVerifiedUntil`._

### 2.3 Protected Component Integration

Components must check for session expiry on mount/interaction and call `clearSessionState()` if the session has expired,
forcing a re-prompt via `PasscodeGate`.

## 3. Implementation ToDo List (Revised)

1.  **Store Update (State):** Modify `src/store/useAppStore.js` to add `hasPasscode`, `isPasscodeVerified`,
    `passcodeVerifiedUntil`, `failedAttempts`, and `lockoutUntil` to the state object.
2.  **Store Update (Persistence):** Update the `partialize` function in `src/store/useAppStore.js` to **exclude**
    `isPasscodeVerified`, `passcodeVerifiedUntil`, `failedAttempts`, and `lockoutUntil` from persistence.
3.  **Store Update (Actions):** Implement the logic for the new action `setPasscode` to set persisted credentials and
    initialize in-memory session state.
4.  **Store Update (Actions):** Implement the logic for the new action `verifyPasscode` to handle attempts, lockout, and
    session expiration check, updating only in-memory state on success/failure.
5.  **Store Update (Actions):** Implement the logic for the new action `changePasscode` to allow resetting the code
    after validation.
6.  **Store Update (Actions):** Update `resetPasscode` to clear all state, including in-memory session state.
7.  **Store Update (Actions):** Create a new action `clearSessionState` to reset only in-memory session state
    (`isPasscodeVerified`, `passcodeVerifiedUntil`, `failedAttempts`, `lockoutUntil`).
8.  **Store Update (Actions):** Create a new action `clearProtectedData` that calls data clearing actions for the three
    components AND calls `resetPasscode`.
9.  **Store Update (Actions):** Update the existing `clearIDB` action to call `resetPasscode()` before clearing IDB.
10. **Component Creation:** Create a new component file, e.g., `src/components/PasscodeDialog.jsx`, to handle the
    4-digit input UI, numeric validation, and feedback messages in a single dedicated element.
11. **Component Creation:** Implement the creation flow within `PasscodeDialog` (for when `!hasPasscode`).
12. **Component Creation:** Implement the verification/reset flow within `PasscodeDialog`, ensuring it calls
    `verifyPasscode` and handles displaying attempt/lockout messages.
13. **Component Creation:** Create a `PasscodeGate.jsx` wrapper component/hook to check verification status
    (`hasPasscode`, `isPasscodeVerified`, `passcodeVerifiedUntil`) and render `PasscodeDialog` or protected content.
14. **Integration:** Wrap `WheelOfLife.jsx`, `QuizStats.jsx`, and `DaysCounter.jsx` with the new `PasscodeGate`.
15. **Integration:** Update the data-clearing logic within the protected components/stores to call the new
    `clearProtectedData` store action.
16. **Refinement:** Define the session duration constant (e.g., 30 minutes) and lockout duration (5 minutes) in the
    store logic.

This revised plan addresses the security requirement by isolating session state from persistent storage. I am ready to
proceed with implementation starting with Task 1.
