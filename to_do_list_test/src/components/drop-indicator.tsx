const DropIndicator = ({ beforeId } : {beforeId : string}) => {
    return (
        <div
            data-column={"0"}
            data-before={beforeId || "-1"}
            className="mx-2 w-1 h-full bg-blue-700 opacity-0 rounded"
        />
    );
}

export default DropIndicator;