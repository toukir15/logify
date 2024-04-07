export const customStyle = {
    control: base => ({
        ...base,
        borderColor: "#4256D0",
        padding: "6px 0",
        fontSize: '16px',
        "&:hover": {
            borderColor: "#4256D0",
        },
    }),
    dropdownIndicator: base => ({
        ...base,
        display: "none"
    }),
    indicatorSeparator: base => ({
        ...base,
        display: "none"
    }),
    menu: base => ({
        ...base,
        display: "none"
    }),
}