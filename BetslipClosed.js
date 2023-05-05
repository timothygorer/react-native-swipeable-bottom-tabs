import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function BetslipClosed(props) {
    return (
        <Svg
            width={25}
            height={25}
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <Path
                d="M2 6.5a4 4 0 014-4h13a4 4 0 014 4v12a4 4 0 01-4 4H6a4 4 0 01-4-4v-12zM6 7.5h13M6 12.5h13M6 17.5h13"
                stroke={props.color}
                strokeWidth={2}
            />
        </Svg>
    );
}

export default BetslipClosed;
