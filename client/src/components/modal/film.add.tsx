import { Button, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React from 'react'

const AddFilm = () => {
    return <ModalContent>
        {(__onClose) => <>
            <ModalHeader>Add new film</ModalHeader>
            <ModalBody></ModalBody>
            <ModalFooter>
                <Button color='danger' onPress={__onClose}>close</Button>
            </ModalFooter>
        </>}
    </ModalContent>
}

export default AddFilm