import React from 'react'
import { Card, Badge, Button, Collapse } from 'react-bootstrap'

//status form needs 3 buttons (and maybe allowing users to set dates for interviews)

function StatusForm() {
    return (
        <div>
            <Button>Heard Back</Button>
            <Button>Applied To</Button>
            <Button>Rejected</Button>
            <Button>Remove Job</Button>
        </div>
    )
}

export default StatusForm
