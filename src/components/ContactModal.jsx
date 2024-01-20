import { Modal } from "react-bootstrap";

const ContactModal = ({
  show,
  handleClose,
  modalData,
  handleModal,
  setModalData,
  handleDeatilsModal,
  handleSerachChnage,
}) => {
  const handleChnage = (e) => {
    if (e.target.checked) {
      const newData = modalData?.data.filter((item) => item.id % 2 === 0);
      setModalData((prev) => ({ ...prev, filterData: newData }));
    } else {
      setModalData((prev) => ({ ...prev, filterData: modalData?.data }));
    }
  };

  return (
    <Modal size="lg" centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> {modalData.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between mb-4">
          <button
            className={`btn btn-lg  btnA ${
              modalData.title === "Modal A" ? "active" : ""
            }`}
            type="button"
            style={{
              background: "#46139f",
              color: "white",
            }}
            onClick={() => handleModal("Modal A")}
          >
            All Contacts
          </button>
          <button
            style={{
              background: "#ff7f50",
              color: "white",
            }}
            className={`btn btn-lg  btnB ${
              modalData.title === "Modal B" ? "active" : ""
            }`}
            type="button"
            onClick={() => handleModal("Modal B")}
          >
            US Contacts
          </button>
        </div>
        <div className="w-100 d-flex justify-content-center">
          <div className="d-flex w-50">
            <div className="border rounded d-flex align-items-center p-1 w-100">
              <img
                src={"/search.png"}
                width={20}
                height={20}
                alt="searchIocn"
                className="mx-2"
              />
              <input
                className="searchBox border-0 outlined-none"
                type="text"
                onKeyDown={(e) => handleSerachChnage(e, modalData.title)}
                placeholder="Search"
                aria-label="Search"
              />
            </div>
          </div>
        </div>
        <table className="table table-striped ">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Country</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>
          <tbody>
            {modalData?.filterData?.map((item, index) => {
              return (
                <tr
                  onClick={() => handleDeatilsModal(item)}
                  className="pointer"
                  key={index}
                >
                  <td>{item.id}</td>
                  <td>{item?.country?.name}</td>
                  <td>{item.phone}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <div className="checkbox">
          <label>
            <input onChange={handleChnage} type="checkbox" /> Only Even
          </label>
        </div>
        <button
          className="btn btn-lg  closeBtn"
          style={{
            background: "transparent",
            border: "1px solid rgb(70, 19, 159)",
          }}
          type="button"
          onClick={handleClose}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ContactModal;
