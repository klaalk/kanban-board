import React, {useEffect, useState} from "react";
import {MdClose, MdFolder, MdFolderOpen} from "react-icons/all";
import EditableLabel from "../../../../commons/components/buttons/editable-label/EditableLabel";
import {
    AddCard,
    DeleteCard,
    EditCard, LoadCards,
    MoveCard,
    ShowCard, UpdateCard
} from "./state/lane.action";
import {useStateValue} from "../../../../state/state.provider";
import AddButton from "../../../../commons/components/buttons/add-button/AddButton";
import Card from "../card/Card";
import {CardStatus} from "../../../../enums/card-status.enum";
import "./Lane.css";

function Lane({lane, rightLane, leftLane, focus, isStatic, onSubmitLane, onResetLane, onDeleteLane}) {

    const dispatch = useStateValue()[1];
    const {title, cards, position, archivedCards} = lane;
    const [archived, setArchived] = useState(archivedCards && archivedCards.length > 0);

    useEffect(() => {
       if (!isStatic && archived)
           dispatch(LoadCards(CardStatus.NotActive, lane.id));
    }, [archived, dispatch, isStatic, cards.length, lane.id]);



    const onMoveCard = (direction, card) => {
        let moveCard = {...card}
        let swapCard = null;
        let swapLane = null;
        let oldLaneId = null;

        if (direction === 'up')
            swapCard = cards[card.position-1];
        if (direction === 'down')
            swapCard = cards[card.position+1];
        if (direction === 'left')
            swapLane = leftLane;
        if (direction === 'right')
            swapLane = rightLane;

        if (swapLane) {
            oldLaneId = card.laneId;
            moveCard.position = swapLane.cards.length;
            moveCard.laneId = swapLane.id;
        } else if (swapCard) {
            moveCard.position = swapCard.position;
        }
        dispatch(MoveCard(moveCard, oldLaneId));
    }

    const isBlocked = (isStatic || position === undefined);
    const classBlocked = isBlocked ? "--blocked" : "";
    const classStatic = isStatic ? "--static" : "";
    return (
        <div className="app-lane">
            <div className={`app-lane--header${classStatic}`}>
                <EditableLabel focus={focus}
                               disabled={isStatic}
                               title={title}
                               onSubmit={onSubmitLane}
                               onReset={onResetLane}/>
                { (position > 1 || position === undefined)
                    && <div className="app-lane--icon"
                            onClick={() => {if (!isStatic) onDeleteLane()}}><MdClose/></div> }
            </div>
            { cards && cards.length > 0 &&
                <div className="app-lane--body">
                    {
                        cards.sort((a,b) => a.position-b.position)
                            .map((card, index) =>(
                                <Card key={card.id}
                                      card={card}
                                      isStatic={isStatic}
                                      isTop={index === 0}
                                      isBottom={index === cards.length-1}
                                      isLeft={!leftLane}
                                      isRight={!rightLane}
                                      onShow={() => dispatch(ShowCard(card.id))}
                                      onEdit={() => dispatch(EditCard(card.id))}
                                      onDelete={() => dispatch(DeleteCard(card))}
                                      onMove={(direction) => onMoveCard(direction, card)}
                                      onArchive={()=> dispatch(UpdateCard({...card, status: CardStatus.NotActive}))}
                                />
                            ))
                    }
                </div>
            }
            <div className="app-lane--footer">
                <AddButton disabled={isBlocked}
                           dark={true}
                           onClick={() => {if (lane.id) dispatch(AddCard(lane.id, lane.cards ? lane.cards.length : 0))}}/>
            </div>
            <div className={`app-lane--archived${classBlocked}`}>
                {
                    archived ?
                    <div className="app-lane--archived-icon"
                         onClick={() => {if (!isBlocked) setArchived(false)}}><MdFolderOpen/></div>
                    :
                    <div className="app-lane--archived-icon"
                         onClick={() => {if (!isBlocked) setArchived(true)}}><MdFolder/></div>
                }
            </div>
            { archived && archivedCards &&
                <div className="app-lane--body">
                    {
                        archivedCards.map((card, index) =>(
                            <Card key={card.id}
                                  card={card}
                                  isStatic={isStatic}
                                  onUnArchive={()=> dispatch(UpdateCard({...card, status: CardStatus.Active}))}
                            />
                        ))
                    }
                </div>
            }
        </div>
    );

}

export default Lane;
