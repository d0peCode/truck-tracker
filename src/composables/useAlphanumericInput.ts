export function useAlphanumericInput(emit: (event: 'update:modelValue', value: string) => void) {
    const handleKeydown = (event: KeyboardEvent) => {
        const allowedKeys = [
            'Backspace',
            'Delete',
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown',
            'Tab',
            'Control',
            'Meta', // Command key on Mac
            'Shift',
            'Alt',
        ];

        const isShortcut = event.ctrlKey || event.metaKey || event.altKey;
        const isAlphanumeric = /^[a-zA-Z0-9]$/.test(event.key);

        console.log(`Key: ${event.key}, Is Alphanumeric: ${isAlphanumeric}, Is Shortcut: ${isShortcut}`);

        if (!isAlphanumeric && !allowedKeys.includes(event.key) && !isShortcut) {
            event.preventDefault();
        } else if (isShortcut && event.key.length === 1 && !isAlphanumeric) {
            // Prevent single character shortcuts from inserting non-alphanumeric characters
            event.preventDefault();
        }
    };

    const handlePaste = (event: ClipboardEvent) => {
        event.preventDefault();
        const pasteData = event.clipboardData?.getData('text') || '';
        const filteredData = pasteData.replace(/[^a-zA-Z0-9]/g, '');
        console.log(`Pasted Data: ${pasteData}, Filtered Data: ${filteredData}`);

        emit('update:modelValue', filteredData);
    };

    return {
        handleKeydown,
        handlePaste,
    };
}
