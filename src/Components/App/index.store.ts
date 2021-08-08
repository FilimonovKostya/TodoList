import State from "../../Store/stateType";
import {TodolistsState} from "../../Store/Todolists/types";

export type TodolistsStateToProps = {
    todolists: TodolistsState[]
}


export type TodolistsDispatchToProps = {

}


const mapStateToProps = (state: State): TodolistsStateToProps => ({
    todolists: state.todolists
})

//
// const mapStateToProps = (state: State): TodolistsDispatchToProps => ({
//     todolists: state.todolists
// })


export {mapStateToProps}