import React from 'react'
import { Button } from 'antd'


export interface Props {
    languageName: string;
    level: number;
    onIncre?: () => void;
    onDecre?: () => void
}

export default class Demo extends React.Component<Props, {}>{
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { languageName, level, onDecre, onIncre } = this.props;
        return (
            <div>
                <div>{{ level }}</div>
                <div>
                    <Button type="primary" onClick={onDecre}>-</Button>
                    <Button onClick={onIncre}>+</Button>
                </div>
            </div>
        )
    }


}