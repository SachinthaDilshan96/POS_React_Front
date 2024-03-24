import {useDispatch,useSelector} from "react-redux";
import {RootState} from "../state/store.ts";
import {decrement, increment} from "../state/calc/manageSlice.ts";

const Calculator = () => {
    const counter = useSelector(state => state.calculator.value);
    const dispatch = useDispatch();
    return (
        <>
            <h1>({counter})</h1>
            <br/>
            <button onClick={()=>dispatch(increment())} className={"btn btn-primary btn-sm"}>+</button>
            &nbsp;
            <button onClick={()=>dispatch(decrement())} className={"btn btn-success btn-sm"}>-</button>
        </>
    );
};

export default Calculator;
