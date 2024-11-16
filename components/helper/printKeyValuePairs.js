// export function printKeyValuePairs(obj, parentKey = '') {
//     let result = [];
//     for (const key in obj) {
//         if (typeof obj[key] === 'object') {
//             const nestedResult = printKeyValuePairs(obj[key], parentKey ? `${parentKey}.${key}` : key);
//             result = result.concat(nestedResult);
//         } else {
//             console.log(`${parentKey ? `${parentKey}.${key}` : key}: ${obj[key]}`);
//             result.push(
//                 <div key={`${parentKey ? `${parentKey}.${key}` : key}`}>
//                     <h5>{`${parentKey ? `${parentKey}.${key}` : key}`}</h5>
//                     <ul>
//                         <li>{obj[key]}</li>
//                     </ul>
//                 </div>
//             );
//         }
//     }
//     return result;
// }


export function printKeyValuePairs(obj, parentKey = '') {
    let result = [];
    for (const key in obj) {
        if (Array.isArray(obj[key])) {
            // Handle arrays
            result.push(<div key={`${key}`}>
                <h5>{`${key} :`}</h5>

            </div>)

            {
                obj[key].map((item, index) => {
                    for (const keys in item) {
                        // Handle nested objects
                        result.push(
                            <div key={`${keys}`}>
                                <h4><b>{`${keys}`}</b> : <span>{item[keys]}</span></h4>
                            </div>
                        );
                    }
                })
            }

        } else if (typeof obj[key] === 'object') {
            // Handle nested objects
            const nestedResult = printKeyValuePairs(obj[key], parentKey ? `${parentKey}.${key}` : key);
            result = result.concat(nestedResult);
        } else {
            // Handle other types
            result.push(
                <div key={`${parentKey ? `${parentKey}.${key}` : key}`}>
                    <h5>{`${parentKey ? `${parentKey}.${key}` : key}`}</h5>
                    <ul>
                        <li>{obj[key]}</li>
                    </ul>
                </div>
            );
        }
    }
    return result;
}


