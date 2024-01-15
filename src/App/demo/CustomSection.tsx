
import React, { ReactNode } from 'react';
type CustomSectionState = {};
type CustomSectionProps = {
};

export class CustomSection extends React.Component<
    CustomSectionProps,
    CustomSectionState
> {
    constructor(props: CustomSectionProps) {
        super(props);
    }
    shouldComponentUpdate(
        nextProps: CustomSectionProps,
        nextState: CustomSectionState
    ) {
        console.log('CustomSection shouldComponentUpdate', nextProps);
        return true;
    }


    render = () => {
        return (
            <div >
                Hello Component section
            </div>
        );
    };
}
