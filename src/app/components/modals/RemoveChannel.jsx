import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import useSocket from '../../hooks/useSocket.jsx';
import { selectors, setCurrentChannel } from '../../slices/channelsSlice.js';
import { hideModal } from '../../slices/modalsSlice.js';

function RemoveChannel() {
  const dispatch = useDispatch();
  const { removeChannel } = useSocket();
  const { show, item } = useSelector((state) => state.modals);
  const generalChannel = useSelector(selectors.selectAll).find(({ name }) => name === 'general');

  const moveToChannel = (id) => dispatch(setCurrentChannel(id));

  const closeModal = () => dispatch(hideModal());

  const generateOnRemove = async () => {
    removeChannel(item, ({ status }) => {
      if (status === 'ok') {
        moveToChannel(generalChannel.id);
        closeModal();
      }
    });
  };

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button
            type="button"
            variant="secondary"
            className="me-2"
            onClick={closeModal}
          >
            Отменить
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={generateOnRemove}
          >
            Удалить
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
export default RemoveChannel;