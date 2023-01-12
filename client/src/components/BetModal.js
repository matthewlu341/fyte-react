import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import '../css/BetModal.css'

const BetModal = (props) => {
    const [show, setShow] = React.useState(false);
    const handleShow = () => setShow(true);

    const handleBet = () => { //When Bet is clicked
        fetch('https://fyte-server.onrender.com/placebets', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({eventName: props.eventName, picks: props.picks.filter(element=>element), user:props.user})
        }).then((response)=>{
            props.getScore();
            props.hasuserBet()
        })
        setShow(false)
    };

    const handleClose = () => { //When Bet is clicked
        setShow(false)
    };
    return (
        <>
        <Button onClick={handleShow} size='lg' variant="success">Bet</Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Your picks</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    {
                        props.picks.map(fighter => {return <h3 id='fighterName'>{fighter}</h3>})
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                I'll do nootin!
            </Button>
            <Button variant="primary" onClick={handleBet}>
                Dana, tell these guys what time it is!
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default BetModal

