import {expect} from "chai";
import {v1} from 'uuid'
import {fromJS, Map, List} from "immutable"

import coreReducer from "../../src/server/reducer"
import {addRoom, removeRoom} from "../../src/server/actionCreater"

describe("server端核心Reducer", () => {

    it("可以当成一个reducer", () => {
        var id = v1()
        var action = [
            {
                type: "ADD_ROOM",
                room: {
                    id,
                    name: "1",
                    owner: "eismeim"
                }
            }, {
                type: "ADD_ROOM",
                room: {
                    name: "2",
                    owner: "terry"
                }
            }, {
                type: "ADD_ROOM",
                room: {
                    name: "3",
                    owner: "eismeim"
                }
            }, {
                type: "REMOVE_ROOM",
                payload: {
                    id: id,
                    user: "eismeim"
                }
            }
        ]

        const finalState = action.reduce(coreReducer, undefined)
        // console.log("finalState:",finalState)
        expect(finalState.get("rooms").size)
            .to
            .equal(2);
        expect(finalState.getIn(["rooms", 0, "owner"]))
            .to
            .equal("terry")

    })

    it("使用actionCreator", () => {
        var id = v1()
        var action = [
            addRoom({id, name: "1", owner: "eismeim"}),
            addRoom({name: "2", owner: "terry"}),
            addRoom({name: "3", owner: "eismeim"}),
            removeRoom({id: id, user: "eismeim"})
        ]

        const finalState = action.reduce(coreReducer, undefined)
        console.log("finalState:", finalState)
        expect(finalState.get("rooms").size).to.equal(2);
        expect(finalState.getIn(["rooms", 0, "owner"])).to.equal("terry")
    })
})