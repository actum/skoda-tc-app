// Icon.tsx
import React from 'react';
import { Text, TextStyle } from 'react-native';

interface IconProps {
    name: string;
    size?: number;
    color?: string;
    style?: TextStyle;
}

const Icon: React.FC<IconProps> = ({
                                       name,
                                       size = 24,
                                       color = '#000',
                                       style,
                                   }) => {
    return (
        <Text
            style={[
                {
                    fontFamily: 'SKODANextIcons-Filled',
                    fontSize: size,
                    color,
                },
                style,
            ]}
        >
            {name}
        </Text>
    );
};

export default Icon;
