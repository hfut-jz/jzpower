import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Icon,{IconProps} from "./icon";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
library.add(fas)

const meta: Meta<IconProps> = {
    title:'Components/Icon',
    component:Icon,
    argTypes:{
        theme:{
            control:{
                type:'select',
                options:['primary','secondary','success','info','warning','dark','light','danger']
            }
        }
    }
}
export default meta;

type Story=StoryObj<IconProps>

export const Default:Story={
    render:(args)=>{

        return (<div>
            <Icon {...args} icon={'arrow-alt-circle-left'} theme="primary" size={'5x'}/>
            <Icon icon={'arrow-alt-circle-up'} theme={'danger'} size={'5x'}/>
            <Icon icon={'arrow-alt-circle-down'}  theme={"success"} size={'5x'}/>
            <Icon icon={'arrow-alt-circle-right'} theme={'warning'} size={'5x'} />
        </div>)
    }
}