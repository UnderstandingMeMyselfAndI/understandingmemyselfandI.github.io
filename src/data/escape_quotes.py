#!/usr/init/env python3
#!/usr/bin/env python3
r"""Replace inner double-quotation marks inside JavaScript string literals with &quot;.

Supports:
- Single-quoted strings ('...')
- Double-quoted strings ("...")
- Template literals (`...`)
- Escaped quotes (\", \', \`, \\)
- Excludes empty strings.
"""

import sys

def replace_inner_double_quotes(code, replacement="&quot;"):
    """
    Replaces inner double-quotation marks inside JavaScript string literals with `replacement`.
    """
    result = []
    i = 0
    n = len(code)

    while i < n:
        char = code[i]
        
        # Check for start of string literal: '', "", or ``
        if char in ("'", '"', '`'):
            quote_char = char
            result.append(char)  # opening quote
            i += 1
            
            while i < n:
                curr_char = code[i]
                
                if curr_char == '\\':
                    # Check if it escapes a double quote inside a double-quoted string
                    if quote_char == '"' and i + 1 < n and code[i + 1] == '"':
                        # Replace escaped inner double quote (\") with replacement
                        result.append(replacement)
                        i += 2
                    else:
                        # Keep other escape sequences as-is
                        result.append(curr_char)
                        i += 1
                        if i < n:
                            result.append(code[i])
                            i += 1
                elif curr_char == quote_char:
                    # Closing quote
                    result.append(curr_char)
                    i += 1
                    break
                else:
                    # If inside single quote or template literal, literal " is an inner double quote
                    if quote_char in ("'", '`') and curr_char == '"':
                        result.append(replacement)
                    else:
                        result.append(curr_char)
                    i += 1
        else:
            result.append(char)
            i += 1
            
    return ''.join(result)

def process_file(filename, replacement="&quot;"):
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading file {filename}: {e}")
        return

    modified = replace_inner_double_quotes(content, replacement)
    
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(modified)
        print(f"Successfully processed and updated '{filename}' (replaced inner double quotes with '{replacement}')")
    except Exception as e:
        print(f"Error writing file {filename}: {e}")

if __name__ == '__main__':
    if len(sys.argv) > 1:
        filename = sys.argv[1]
        replacement = sys.argv[2] if len(sys.argv) > 2 else "&quot;"
        process_file(filename, replacement)
    else:
        # Test examples
        test_code = r"""
        const a = 'when he said "I am superman" and then ran';
        const b = "He said \"Hello\" to me";
        const c = `template string with "nested double quote" inside`;
        const empty1 = "";
        const empty2 = '';
        const empty3 = ``;
        """
        print("ORIGINAL:")
        print(test_code)
        print("-" * 40)
        modified = replace_inner_double_quotes(test_code, "&quot;")
        print("MODIFIED:")
        print(modified)
