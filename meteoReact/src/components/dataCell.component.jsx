import "../assets/style/dataCell.style.css"

const DataCellComponent = ({donnee,unite = ""}) => {
    return <div className={`dataCell ${unite}`}>{donnee}</div>
}

export default DataCellComponent;