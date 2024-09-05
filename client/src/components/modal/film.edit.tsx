'use client'
import { Button, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React from 'react'

const EditFilm = () => {
    return <ModalContent>
        {(__onClose) => <>
            <ModalHeader>Edit film</ModalHeader>
            <ModalBody></ModalBody>
            <ModalFooter>
                <Button color='danger' onPress={__onClose}>close</Button>
            </ModalFooter>
        </>}
    </ModalContent>
}

export default EditFilm