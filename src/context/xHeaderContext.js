// import React, { createContext, useContext, useState } from "react";

// const HeaderContext = createContext();

// export function HeaderProvider({ children }) {
//   const [practiceNo, setPracticeNo] = useState(null);
//   const [practiceDate, setPracticeDate] = useState(null);

//   return (
//     <HeaderContext.Provider
//       value={{
//         practiceNo,
//         setPracticeNo,
//         practiceDate,
//         setPracticeDate,
//       }}
//     >
//       {children}
//     </HeaderContext.Provider>
//   );
// }

// export const useHeader = () => useContext(HeaderContext);
