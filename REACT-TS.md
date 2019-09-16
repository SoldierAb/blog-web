# 三千字讲清TypeScript与React的实战技巧

很多时候虽然我们了解了TypeScript相关的基础知识，但是这不足以保证我们在实际项目中可以灵活运用，比如现在绝大部分前端开发者的项目都是依赖于框架的，因此我们需要来讲一下React与TypeScript应该如何结合运用。

如果你仅仅了解了一下TypeScript的基础知识就上手框架会碰到非常多的坑（比如笔者自己），如果你是React开发者一定要看过本文之后再进行实践。

快速启动TypeScript版react

使用TypeScript编写react代码，除了需要typescript这个库之外，还至少需要额外的两个库:

``` javascript
yarn add - D @types / {
    react,
    react - dom
}
```

可能有人好奇@types开头的这种库是什么？

由于非常多的JavaScript库并没有提供自己关于TypeScript的声明文件，导致TypeScript的使用者无法享受这种库带来的类型，因此社区中就出现了一个项目DefinitelyTyped，他定义了目前市面上绝大多数的JavaScript库的声明，当人们下载JavaScript库相关的@types声明时，就可以享受此库相关的类型定义了。

当然，为了方便我们选择直接用TypeScript官方提供的react启动模板。

``` javascript
create - react - app react - ts - app--scripts - version = react - scripts - ts
```

## 无状态组件

我们用初始化好了上述模板之后就需要进行正式编写代码了。

无状态组件是一种非常常见的react组件，主要用于展示UI，初始的模板中就有一个logo图，我们就可以把它封装成一个Logo组件。

在JavaScript中我们往往是这样封装组件的：

``` typescript
import * as React from 'react'

export const Logo = props => {
    const {
        logo,
        className,
        alt
    } = props
    
    return ( <
        img src = {
            logo
        }
        className = {
            className
        }
        alt = {
            alt
        }
        />
    )
}
```

但是在TypeScript中会报错:

原因就是我们没有定义props的类型, 我们用interface定义一下props的类型，那么是不是这样就行了：

``` typescript
import * as React from 'react'

interface IProps {
    logo ? : string
    className ? : string
    alt ? : string
}

export const Logo = (props: IProps) => {
    const {
        logo,
        className,
        alt
    } = props
    
    return ( <
        img src = {
            logo
        }
        className = {
            className
        }
        alt = {
            alt
        }
        />
    )
}
```

这样做在这个例子中看似没问题，但是当我们要用到children的时候是不是又要去定于children类型？

比如这样:

``` typescript
interface IProps {
    logo ? : string
    className ? : string
    alt ? : string
    children ? : ReactNode
}
//其实有一种更规范更简单的办法,type SFC<P>其中已经定义了children类型。
```

我们只需要这样使用:

``` typescript
export const Logo: React.SFC < IProps > = props => {
    const {
        logo,
        className,
        alt
    } = props
    
    return ( <
        img src = {
            logo
        }
        className = {
            className
        }
        alt = {
            alt
        }
        />
    )
}

//我们现在就可以替换App.tsx中的logo组件,可以看到相关的props都会有代码提示：
```

如果我们这个组件是业务中的通用组件的话，甚至可以加上注释:

``` typescript
interface IProps {
    /**
     * logo的地址
     */
    logo ? : string
    className ? : string
    alt ? : string
}
```

这样在其他同事调用此组件的时候，除了代码提示外甚至会有注释的说明:

## 有状态组件

现在假设我们开始编写一个Todo应用:

首先需要编写一个todoInput组件:

如果我们按照JavaScript的写法，只要写一个开头就会碰到一堆报错

有状态组件除了props之外还需要state，对于class写法的组件要泛型的支持，即Component<P, S>，因此需要传入传入state和props的类型，这样我们就可以正常使用props和state了。

``` typescript
import * as React from 'react'

interface Props {
    handleSubmit: (value: string) => void
}

interface State {
    itemText: string
}

export class TodoInput extends React.Component < Props, State > {
    constructor(props: Props) {
        super(props)
        this.state = {
            itemText: ''
        }
    }
}
```

细心的人会问，这个时候需不需要给Props和State加上Readonly，因为我们的数据都是不可变的，这样会不会更严谨？

其实是不用的，因为React的声明文件已经自动帮我们包装过上述类型了，已经标记为readonly。

如下：

接下来我们需要添加组件方法，大多数情况下这个方法是本组件的私有方法，这个时候需要加入访问控制符private。

``` typescript
    private updateValue(value: string) {
        this.setState({
            itemText: value
        })
    }
```

接下来也是大家经常会碰到的一个不太好处理的类型，如果我们想取某个组件的ref，那么应该如何操作？

比如我们需要在组件更新完毕之后，使得input组件focus。

首先，我们需要用React.createRef创建一个ref，然后在对应的组件上引入即可。

``` typescript
private inputRef = React.createRef < HTMLInputElement > ()
    ...
    
    <
    input
    
ref = {
    this.inputRef
}
className = "edit"
value = {
    this.state.itemText
}

/>
```

需要注意的是，在createRef这里需要一个泛型，这个泛型就是需要ref组件的类型，因为这个是input组件，所以类型是HTMLInputElement，当然如果是div组件的话那么这个类型就是HTMLDivElement。

受控组件

再接着讲TodoInput组件，其实此组件也是一个受控组件，当我们改变input的value的时候需要调用this.setState来不断更新状态，这个时候就会用到『事件』类型。

由于React内部的事件其实都是合成事件，也就是说都是经过React处理过的，所以并不原生事件，因此通常情况下我们这个时候需要定义React中的事件类型。

对于input组件onChange中的事件，我们一般是这样声明的:

``` typescript
private updateValue(e: React.ChangeEvent < HTMLInputElement > ) {

    this.setState({
        itemText: e.target.value
    })
    
}
```

当我们需要提交表单的时候，需要这样定义事件类型:

``` typescript
    private handleSubmit(e: React.FormEvent < HTMLFormElement > ) {
        e.preventDefault()
        if (!this.state.itemText.trim()) {
            return
        }
    
        this.props.handleSubmit(this.state.itemText)
        this.setState({
            itemText: ''
        })
    }
```

那么这么多类型的定义，我们怎么记得住呢？遇到其它没见过的事件，难道要去各种搜索才能定义类型吗？其实这里有一个小技巧, 当我们在组件中输入事件对应的名称时，会有相关的定义提示，我们只要用这个提示中的类型就可以了。

默认属性

React中有时候会运用很多默认属性，尤其是在我们编写通用组件的时候，之前我们介绍过一个关于默认属性的小技巧，就是利用class来同时声明类型和创建初始值。

再回到我们这个项目中，假设我们需要通过props来给input组件传递属性，而且需要初始值，我们这个时候完全可以通过class来进行代码简化。

// props.type.ts

``` typescript
interface InputSetting {

    placeholder ? : string
    maxlength ? : number
    
}

export class TodoInputProps {

    public handleSubmit: (value: string) => void
    public inputSetting ? : InputSetting = {
        maxlength: 20,
        placeholder: '请输入todo',
    }
    
}
```

再回到TodoInput组件中，我们直接用class作为类型传入组件, 同时实例化类，作为默认属性。

用class作为props类型以及生产默认属性实例有以下好处：

代码量少：一次编写，既可以作为类型也可以实例化作为值使用
避免错误：分开编写一旦有一方造成书写错误不易察觉
这种方法虽然不错，但是之后我们会发现问题了，虽然我们已经声明了默认属性，但是在使用的时候，依然显示inputSetting可能未定义。

在这种情况下有一种最快速的解决办法，就是加!, 它的作用就是告诉编译器这里不是undefined，从而避免报错。

如果你觉得这个方法过于粗暴，那么可以选择三目运算符做一个简单的判断:

如果你还觉得这个方法有点繁琐，因为如果这种情况过多，我们需要额外写非常多的条件判断，而更重要的是，我们明明已经声明了值，就不应该再做条件判断了，应该有一种方法让编译器自己推导出这里的类型不是undefined，这就涉及到一些高级类型了。

利用高级类型解决默认属性报错

我们现在需要先声明defaultProps的值:

``` typescript
const todoInputDefaultProps = {

    inputSetting: {
        maxlength: 20,
        placeholder: '请输入todo',
    }
    
}
```

接着定义组件的props类型

``` typescript
type Props = {

        handleSubmit: (value: string) => void
        children: React.ReactNode
    
    } & Partial < typeof todoInputDefaultProps >
    //Partial的作用就是将类型的属性全部变成可选的, 也就是下面这种情况：
    
    {

        inputSetting ? : {
            maxlength: number;
            placeholder: string;
        } | undefined;
    
    }
//那么现在我们使用Props是不是就没有问题了？

export class TodoInput extends React.Component < Props, State > {

    public static defaultProps = todoInputDefaultProps
    
    ...

    public render() {
        const {
            itemText
        } = this.state
        const {
            updateValue,
            handleSubmit
        } = this
        const {
            inputSetting
        } = this.props
    
        return ( <
            form onSubmit = {
                handleSubmit
            } >
            <
            input maxLength = {
                inputSetting.maxlength
            }
            type = 'text'
            value = {
                itemText
            }
            onChange = {
                updateValue
            }
            /> <
            button type = 'submit' > 添加todo < /button> <
            /form>
        )
    }
    
    ...

}
```

我们看到依旧会报错：

其实这个时候我们需要一个函数，将defaultProps中已经声明值的属性从『可选类型』转化为『非可选类型』。

我们先看这么一个函数:

``` typescript
const createPropsGetter = <DP extends object>(defaultProps: DP) => {

    return <P extends Partial<DP>>(props: P) => {
        type PropsExcludingDefaults = Omit<P, keyof DP>
        type RecomposedProps = DP & PropsExcludingDefaults
    
        return (props as any) as RecomposedProps
    }
    
}
```

这个函数接受一个defaultProps对象，<DP extends object>这里是泛型约束，代表DP这个泛型是个对象，然后返回一个匿名函数。

再看这个匿名函数，此函数也有一个泛型P, 这个泛型P也被约束过, 即<P extends Partial<DP>>，意思就是这个泛型必须包含可选的DP类型（实际上这个泛型P就是组件传入的Props类型）。

接着我们看类型别名PropsExcludingDefaults，看这个名字你也能猜出来，它的作用其实是剔除Props类型中关于defaultProps的部分，很多人可能不清楚Omit这个高级类型的用法，其实就是一个语法糖：

type Omit<P, keyof DP> = Pick<P, Exclude<keyof P, keyof DP>>
而类型别名RecomposedProps则是将默认属性的类型DP与剔除了默认属性的Props类型结合在一起。

其实这个函数只做了一件事，把可选的defaultProps的类型剔除后，加入必选的defaultProps的类型，从而形成一个新的Props类型，这个Props类型中的defaultProps相关属性就变成了必选的。

这个函数可能对于初学者理解上有一定难度，涉及到TypeScript文档中的高级类型，这算是一次综合应用。
完整代码如下：

``` typescript

import * as React from 'react'

interface State {

    itemText: string
    
}

type Props = {

    handleSubmit: (value: string) => void
    children: React. ReactNode
    
} & Partial<typeof todoInputDefaultProps>
const todoInputDefaultProps = {

    inputSetting: {
        maxlength: 20,
        placeholder: '请输入todo',
    }
    
}

export const createPropsGetter = <DP extends object>(defaultProps: DP) => {

    return <P extends Partial<DP>>(props: P) => {
        type PropsExcludingDefaults = Omit<P, keyof DP>
        type RecomposedProps = DP & PropsExcludingDefaults
    
        return (props as any) as RecomposedProps
    }
    
}

const getProps = createPropsGetter(todoInputDefaultProps)

export class TodoInput extends React. Component<Props, State> {

    public static defaultProps = todoInputDefaultProps
    
    
    constructor(props: Props) {
        super(props)
        this.state = {
            itemText: ''
        }
    }
    
    public render() {
        const { itemText } = this.state
        const { updateValue, handleSubmit } = this
        const { inputSetting } = getProps(this.props)
    
        return (
            <form onSubmit={handleSubmit} >
                <input maxLength={inputSetting.maxlength} type='text' value={itemText} onChange={updateValue} />
                <button type='submit' >添加todo</button>
            </form>
        )
    }
    
    private updateValue(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ itemText: e.target.value })
    }
    
    private handleSubmit(e: React.FormEvent < HTMLFormElement > ) {
        e.preventDefault()
        if (!this.state.itemText.trim()) {
            return
        }
    
        this.props.handleSubmit(this.state.itemText)
        this.setState({
            itemText: ''
        })
    }
    
}
```

## 高阶组件

关于在TypeScript如何使用HOC一直是一个难点，我们在这里就介绍一种比较常规的方法。

我们继续来看TodoInput这个组件，其中我们一直在用inputSetting来自定义input的属性，现在我们需要用一个HOC来包装TodoInput，其作用就是用高阶组件向TodoInput注入props。

我们的高阶函数如下:

``` typescript
import * as hoistNonReactStatics from 'hoist-non-react-statics'
import * as React from 'react'

type InjectedProps = Partial < typeof hocProps >

    const hocProps = {
        inputSetting: {
            maxlength: 30,
            placeholder: '请输入待办事项',
        }
    }
    
export const withTodoInput = < P extends InjectedProps > (
    UnwrappedComponent: React.ComponentType < P > ,
) => {
    type Props = Omit < P, keyof InjectedProps >
    
        class WithToggleable extends React.Component < Props > {

            public static readonly UnwrappedComponent = UnwrappedComponent
    
            public render() {

                return ( <
                    UnwrappedComponent inputSetting = {
                        hocProps
                    } {
                        ...this.props as P
                    }
                    />
                );
            }
        }
    
    return hoistNonReactStatics(WithToggleable, UnwrappedComponent)
}
```

如果你搞懂了上一小节的内容，这里应该没有什么难度。

这里我们的P表示传递到HOC的组件的props，React. ComponentType<P> 是 React. FunctionComponent<P> | React. ClassComponent<P>的别名，表示传递到HOC的组件可以是类组件或者是函数组件。

其余的地方Omit as P等都是讲过的内容，读者可以自行理解，我们不再像上一小节那样一行行解释了。

只需要这样使用：

const HOC = withTodoInput<Props>(TodoInput)
小结

我们总结了最常见的几种组件在TypeScript下的编写方式，通过这篇文章你可以解决在React使用TypeScript绝大部分问题了.

