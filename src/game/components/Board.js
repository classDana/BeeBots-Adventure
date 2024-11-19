import { Row, Col} from 'react-bootstrap';
import Cell from './Cell';
import beebot from "./BeeBot.png";
import singleBush from "../../images/maze-objects/single_bush.png";
import picnicBasket from "../../images/maze-objects/picnic_basket.png";
import pluralBushes from "../../images/maze-objects/plural_bushes.png";
import tree from "../../images/maze-objects/tree.png";
import bicycle from "../../images/maze-objects/bicycle.png";
export default function Board(props){

    const rows = 5;
    const columns = 6;

    const mazeMap = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < columns; j++) {
            // check if the beebot is in the current position and displays in the current cell
            if (props.beebot && props.beebot.x === i && props.beebot.y === j) {
                row.push(
                    <Col lg={2} md={2} sm={2} className="p-0">
                    <Cell
                        key={`${i}-${j}`}
                        image={beebot}
                        row={i}
                        col={j}
                        orientation={props.beebot.o}
                    /></Col>
                    ); 
            } else {
                switch (props.getCurrState(i,j)) {
                    case 1:
                        row.push(createCell(i,j,picnicBasket,'n'));
                        break;

                    case 2:
                        row.push(createCell(i,j,singleBush,'n'));
                        break;
                    
                    case 3:
                        row.push(createCell(i,j,pluralBushes,'n'));
                        break;

                    case 4:
                        row.push(createCell(i,j,bicycle,'n'));
                        break;
                    case 5:
                        row.push(createCell(i,j,tree,'n'));
                        break;
                
                    default:
                        row.push(createCell(i,j,null,'n'));
                        break;
                }
            }
        }
        mazeMap.push(<Row >{row}</Row>);
    }

    /**
     * 
     * @param {*} i 
     * @param {*} j 
     * @param {*} image 
     * @returns 
     */
    function createCell(i,j,image,o) {
        return(
            <Col lg={2} md={2} sm={2} className="p-0">
                <Cell
                    key={`${i}-${j}`}
                    image={image}
                    row={i}
                    col={j}
                    orientation={o}
                />
            </Col>
        );
    }

    

    return (
        <div className='board'>
            {mazeMap}
        </div>
    );
}