export const ExcelColumnName = (columnNumber) => {
  try {  
    let columnName = "";

    while (columnNumber > 0) {
      const remainder = (columnNumber - 1) % 26;
      columnName = String.fromCharCode(65 + remainder) + columnName;
      columnNumber = Math.floor((columnNumber - 1) / 26);
    }

    return columnName;

  } catch (error) {
    console.error(`Err Helpers getcol: ${error}`);
    return "Error"    
  }
}

export const generateDynamicArray = (n) => {
  return Array.from({ length: n }, (_, index) => ({ field: String(index + 1) }));
};