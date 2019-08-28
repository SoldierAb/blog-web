import React, { ReactNode } from 'react'
import ReactMde from 'react-mde'
import ReactDom from 'react-dom'
import * as Showdown from 'showdown'
import "react-mde/lib/styles/css/react-mde-all.css"

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
});

interface MProps{

}

// export default class MarkDown extends React.Component<{},{}>{

//     constructor(props:MProps){}
//     render():ReactNode{
//         return (
//             <div className="container">
//                 <ReactMde
//                     value={value}
//                     onChange={setValue}
//                     // selectedTab={selectedTab}
//                     onTabChange={setSelectedTab}
//                     generateMarkdownPreview={markdown =>
//                         Promise.resolve(converter.makeHtml(markdown))
//                     }
//                 />
//             </div>
//         );
//     }
// }

export default function App() {
    const [value, setValue] = React.useState("**Hello world!!!**");
    const [selectedTab, setSelectedTab] = React.useState("write");
    return (
        <div className="container">
            <ReactMde
                value={value}
                onChange={setValue}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={markdown =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
            />
        </div>
    );
}