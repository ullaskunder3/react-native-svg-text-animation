import { useRef, useState } from 'react';
import {Path} from 'react-native-svg'
import Animated, { useAnimatedProps } from 'react-native-reanimated';

interface AnimatedStrokeProps{
    d: string;
    progress: Animated.SharedValue<number>;
}
const AnimatedPath = Animated.createAnimatedComponent(Path);
const colors = ['#ff435c', '#00b2ed', '#002461', '#ffddf2', '#ff61d3']

export const AnimatedStroke = ({d, progress}:AnimatedStrokeProps)=>{
    const [length, setLength] = useState(0);
    const ref = useRef<typeof AnimatedPath>(null);
    const strokeAnimation = useAnimatedProps(()=>(
        {
            strokeDashoffset: length - length*progress.value,
        }
    ))
    return(
        <AnimatedPath 
        animatedProps={strokeAnimation}
        onLayout={() => setLength(ref.current!.getTotalLength())}
        ref={ref}
        d={d}
        stroke={'#001947'}
        strokeWidth={10}
        strokeDasharray={length}
        />
    )
}