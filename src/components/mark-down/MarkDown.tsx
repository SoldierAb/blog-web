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

enum selectedTab{
    write="write",
    preview="preview"
} 

interface MProps{
    setValue?:()=>void
    setSelectedTab?:()=>void
}


interface MValue{
    value:string
    selectedTab:any
}

export default class MarkDown extends React.Component<MProps,MValue>{

    constructor(props:MProps){
        super(props);
        this.state={
            value:"**Hello world!!!**",
            selectedTab:selectedTab[selectedTab.write]
        }
    }

    setValue = (value:string)=>{
        this.setState({
            value
        })
    }

    setSelectedTab = (selectedTab:string)=>{
        this.setState({
            selectedTab
        })
    }



    render():ReactNode{
        const {value,selectedTab} = this.state;
        return (
            <div className="container">
                <ReactMde
                    value={value}
                    selectedTab={selectedTab}
                    onChange={this.setValue}
                    onTabChange={this.setSelectedTab}
                    generateMarkdownPreview={markdown =>
                        Promise.resolve(converter.makeHtml(markdown))
                    }
                />
            </div>
        );
    }
}

// export default function App() {
//     const [value, setValue] = React.useState("**Hello world!!!**");
//     const [selectedTab, setSelectedTab] = React.useState("write");
//     return (
//         <div className="container">
//             <ReactMde
//                 value={value}
//                 onChange={setValue}
//                 onTabChange={setSelectedTab}
//                 generateMarkdownPreview={markdown =>
//                     Promise.resolve(converter.makeHtml(markdown))
//                 }
//             />
//         </div>
//     );
// }