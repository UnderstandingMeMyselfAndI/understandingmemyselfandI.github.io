const faqData = [
    {
        title:'Data privacy',
        content:[
           {
                question:'',
                title:'How your data is kept private',
                content:[
                    'Your data is stored only on this device.',
                    'It is never sent to a server, never shared, and never uploaded anywhere.',
                    'To protect your privacy, the app can lock your data using encryption, similar to how banking or password apps work.',
                ]
            },
            {
                question:'',
                title:'What encryption means (in simple terms)',
                content:[
                    'When encryption is turned on:',
                    '- Your data is scrambled into a format that looks like random text.',
                    '- Only your password can unlock it.',
                    '- Even if someone opens the app files or storage, they cannot read your stored data.',
                    'If the correct password isn’t entered, the app simply cannot understand the data.',
                  
                ]
            },
             {
                question:'',
                title:'PIN vs Password — what’s the difference?',
                content:[
                    'Password:',
                    '- Protects your data using strong encryption.',
                    '- Required to unlock your data if the app is restarted.',
                    '- Can recover access if you forget your PIN.',
                    'PIN (optional):',
                    '- Makes unlocking faster.',
                    '- Used only on this device.',
                    '- Never stored as plain numbers.',
                    '- You can change it anytime.',
                    '',
                  
                ]
            },
             {
                question:'',
                title:'What happens if you don\’t unlock the app?',
                content:[
                    'If the app is locked:',
                    '- Your data stays safely encrypted.',
                    '- The app shows an empty or default view.',
                    '- No personal data is displayed.',
                    'Even if someone tries to tamper with the app, your data cannot be read without the correct password and or PIN.',
                  
                ]
            },
             {
                question:'',
                title:'Important things to know',
                content:[
                    'If you forget both your password and PIN, your data cannot be recovered',
                    'There is no “reset” or “support unlock” because:',
                    '- Your data never leaves your device.',
                    '- We do not have access to your password or PIN.',
                    'This is intentional — it protects your privacy.',
                    'You can optionally add a password hint to help you remember.',
                
                    
                  
                ]
            },
               {  
                question:'',
                title:'About device security',
                content:[
                    'This app protects your data from:',
                    '- Casual snooping.',
                    '- Shared devices.',
                    '- Someone opening your phone or browser.',
                    'It cannot protect against:',
                    '- Someone who fully controls your device.',
                    '- Malware or a compromised operating system.',
                    '- Other software on your device that reads what is displayed on your screen.',
                    
                  
                ]
            },
              {  
                question:'',
                title:'Your control, your choice.',
                content:[
                    '-Encryption is optional but recommended.',
                    '- PIN is optional but convenient.',
                    '- Your data is always stored locally.',
                    '- You stay in control at all times.',
                    'If privacy matters to you, using a password is strongly recommended.',
                    '',
                    '',
                    '',
                    
                  
                ]
            },
            {  
                question:'',
                title:'Where your data is stored',
                content:[
                    'Your data is stored locally using:',
                    '- Your browser’s secure storage (IndexedDB / local storage).',
                    '- Your device’s own file system (via your browser)',
                    'We do not store or receive your data.',
                    'We cannot see, access, or recover it.',
                    '',
                    '',
                    '',
                    
                  
                ]
            }
            {  
                question:'',
                title:'',
                content:[
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    
                  
                ]
            }
        ]
    }
	
];

export default faqData