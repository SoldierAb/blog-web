import React, { ReactNode } from 'react'
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import "react-mde/lib/styles/css/react-mde-all.css"
import {fetchForm}  from '../../utils/fetchUtil'
import {API_CONFIG} from '../../config'

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
    setValue?:(value:string)=>void
    setSelectedTab?:(tab:string)=>void
    getValue?:()=>string
    getTab?:()=>string
}


interface MValue{
    value:string
    selectedTab:any
}

export default class MarkDown extends React.Component<MProps,MValue>{

    public constructor(props:MProps){
        super(props);
        this.state={
            value:(function (){
                let str="";
                for(let i=0;i<999;i++){
                    str+="**测试博客 No.1!!!**"
                }
                return str
            })(),
            selectedTab:selectedTab[selectedTab.write]
        }
    }

    public getValue = ():string=>{
        return this.state.value
    }

    public setValue = (value:string)=>{
        this.setState({
            value
        })
    }

    public setSelectedTab = (selectedTab:string)=>{
        this.setState({
            selectedTab
        })
    }

    componentDidMount(){
        console.log(this.state.value);
        const {value:content} = this.state;
        fetchForm(API_CONFIG.MARKDOWN_ADD,{
            title:'测试',
            content,
            created_time:new Date().getTime()
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
                    generateMarkdownPreview={ (markdown:any) =>
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