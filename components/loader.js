import { Box } from "@mui/material";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
const TIMER = 150; // Milliseconds between moving the next block
const TRANSITION = .5 // Seconds to actually move one block
const DEF_SIZE = 60; // Pixels height/width
const GUTTER = 5; // Spacing in percentage between tiles
const initialState = {

    positions: {
        1: 'alpha',
        2: 'bravo',
        3: 'charlie',
        4: null,
        5: 'delta',
        6: 'echo',
        7: 'foxtrot'
    },
    stateNumber: 0
}

const Loader = (props) => {
    const [state, setState] = useState(initialState)
    const [timer, setTimer] = useState(TIMER)

    useEffect(() => {
        setTimerData(timer)
        return () => {
            clearInterval(timer);
        }
    }, [timer])

    const setTimerData = (time) => {
        if (timer) {
            clearInterval(timer);
        }
        setTimer(setInterval(setNextStateData, time))

        // timer = setInterval(this.setNextState, time);
    }

    // componentWillUnmount(){
    //     clearInterval(this.timer);
    // }
    const setNextStateData = useCallback(
        () => {
            const currentPositions = state.positions;
            const emptyIndex = positionForTile(null);
            const indexToMove = tileIndexToMove();
            const newPositions = Object.assign({}, currentPositions, {
                [indexToMove]: null,
                [emptyIndex]: currentPositions[indexToMove]
            });

            const currentState = state.stateNumber;
            const nextState = (currentState === 7) ? 0 : currentState + 1;

            state.stateNumber = nextState
            state.positions = newPositions
        },
        [], // Tells React to memoize regardless of arguments.
    );
    const clipPathForPosition = (position) => {
        position = parseInt(position, 10);
        const SIZE = (100 - 2 * GUTTER) / 3;
        const VAR0 = '0% ';
        const VAR1 = (SIZE + GUTTER) + '% ';
        const VAR2 = (2 * SIZE + 2 * GUTTER) + '% ';
        switch (position) {
            case 1: return 'inset(' + VAR1 + VAR2 + VAR1 + VAR0 + ' round 5%)';
            case 2: return 'inset(' + VAR0 + VAR2 + VAR2 + VAR0 + ' round 5%)';
            case 3: return 'inset(' + VAR0 + VAR1 + VAR2 + VAR1 + ' round 5%)';
            case 4: return 'inset(' + VAR1 + VAR1 + VAR1 + VAR1 + ' round 5%)';
            case 5: return 'inset(' + VAR2 + VAR1 + VAR0 + VAR1 + ' round 5%)';
            case 6: return 'inset(' + VAR2 + VAR0 + VAR0 + VAR2 + ' round 5%)';
            case 7: return 'inset(' + VAR1 + VAR0 + VAR1 + VAR2 + ' round 5%)';
        }
    }
    const tileIndexToMove = () => {
        switch (state.stateNumber) {
            case 0: return 7;
            case 1: return 6;
            case 2: return 5;
            case 3: return 4;
            case 4: return 3;
            case 5: return 2;
            case 6: return 1;
            case 7: return 4;
        }
    }
    const positionForTile = (radioCommand) => {
        for (var position in state.positions) {
            var tile = state.positions[position];
            if (tile === radioCommand) {
                return position;
            }
        }
    }

    const renderTiles = () => {
        return ['alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot'].map((radioCommand) => {
            const pos = positionForTile(radioCommand);
            const styles = {
                transition: (TRANSITION) + 's cubic-bezier(0.86, 0, 0.07, 1)',
                WebkitClipPath: clipPathForPosition(pos)
            }
            return <div key={"rect-" + radioCommand} style={styles} className={"rect " + radioCommand} />
        })
    }
    const { size, style, center } = props;
    const styles = Object.assign({
        width: DEF_SIZE + 'px',
        height: DEF_SIZE + 'px',
        zIndex: 2000
    }, style);

    if (size) {
        styles.width = size + 'px';
        styles.height = size + 'px';
    }
    styles.margin = '0 auto'

    let className = "sw-loader__wrapper"
    if (center) {
        className += " sw-loader__wrapper--center";
    }
    return (
        <Box style={{
            height: "100vh",
            justifyContent: "center",
            // position: "absolute",
            width: "100%",
            position: "fixed",
            paddingTop: "20%",
            zIndex: 2001

        }}>
            <div style={styles} className={className}>
                <div className="sw-loader__holder">
                    {renderTiles()}
                </div>
            </div>
            <Box style={{
                position: "absolute",
                background: "white",
                height: "100vh",
                width: "100%",
                top: 0,
                opacity: 0.3,
            }}></Box>

        </Box>
    )
}
export default Loader

