import { useRef, useState } from 'react';
import Animated, { Easing, useAnimatedProps } from 'react-native-reanimated';
import { Path } from 'react-native-svg'

interface AnimatedStrokeProps {
    d: string;
    progress: Animated.SharedValue<number>;
}
const AnimatedPath = Animated.createAnimatedComponent(Path);
const colors = ['#ff435c', '#00b2ed', '#002461', '#ffddf2', '#ff61d3']

export const AnimatedStroke = ({ d, progress }: AnimatedStrokeProps) => {
    const stroke = colors[Math.round(Math.random()*(colors.length-1))];
    const [length, setLength] = useState(0);
    const ref = useRef<Path |any>(null);
    const bgStrokeAnimation = useAnimatedProps(() => ({
        strokeDashoffset: length - length * Easing.bezier(0.61, 1, 0.88, 1).factory()(progress.value),
        fillOpacity: progress.value,
    }))
    const strokeAnimation = useAnimatedProps(() => ({
            strokeDashoffset: length - length * Easing.bezier(0.37, 0, 0.63, 1).factory()(progress.value),
    }))
    return (
        <>
            <AnimatedPath
                animatedProps={bgStrokeAnimation}
                d={d}
                stroke={stroke}
                strokeWidth={10}
                fill={'#201f1f'}
                strokeDasharray={length}
            />
            <AnimatedPath
                animatedProps={strokeAnimation}
                ref={ref}
                //@ts-ignore
                onLayout={() => setLength(ref.current?.getTotalLength())}
                d={d}
                // stroke={'#000000'}
                stroke={'#fcfcfc'}
                strokeWidth={10}
                strokeDasharray={length}
            />
        </>
    )
}