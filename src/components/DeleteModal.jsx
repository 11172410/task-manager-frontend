import { Modal, ModalBody, Button, ModalHeader } from "flowbite-react";

import React from "react";

function DeleteModal({ show, handleClose, handleDelete }) {
  return (
    <>
      <Modal show={show} size="md" onClose={handleClose} popup>
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this task?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="red" onClick={handleDelete}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={handleClose}>
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default DeleteModal;
