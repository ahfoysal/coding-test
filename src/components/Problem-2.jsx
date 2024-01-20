import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ContactModal from "./ContactModal";
import DetailsModal from "./DetailsModal";
import { AppService } from "../../util/axios";

const Problem2 = () => {
  const [showDeatilsModal, setShowDeatilsModal] = useState(false);
  // for pagination
  const navigate = useNavigate();
  const [modalData, setModalData] = useState({
    title: "",
    data: [],
    filterData: [],
    singleData: {},
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDetailsModalClose = () => setShowDeatilsModal(false);
  const handleDetailsModalShow = () => setShowDeatilsModal(true);

  // handle modal
  const handleModal = (val) => {
    setModalData((prev) => ({ ...prev, title: val }));
    handleShow();
    fetchData(val);
    const currentURL = new URL(window.location.href);
    currentURL.searchParams.set("ModalOpen", val.replace("Modal ", ""));
    navigate({ search: currentURL.search });
  };

  // fetch data from api
  const fetchData = async (val) => {
    try {
      let getUrl =
        val === "Modal A"
          ? await AppService.getAllContactsReq()
          : await AppService.getUSCountryReq();

      const res = getUrl;
      setModalData((prev) => ({
        ...prev,
        data: res.data.results,
        filterData: res.data.results,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  // handle details modal
  const handleDeatilsModal = (data) => {
    handleDetailsModalShow();
    setModalData((prev) => ({ ...prev, singleData: data }));
  };

  // handle search contacts api
  const handleSearchContacts = async (e, title) => {
    try {
      const payload = {
        search: e.target.value,
      };

      let requstUrl =
        title === "Modal A"
          ? await AppService.getAllContactsReq(payload)
          : await AppService.getUSCountryReq(payload);
      const res = requstUrl;
      setModalData((prev) => ({
        ...prev,
        data: res?.data?.results,
        filterData: res.data.results,
      }));
    } catch (error) {
      alert("Something went wrong");
    }
  };

  // debounce function call
  const debouncedSearchContacts = debounce(handleSearchContacts, 700);

  // handle search input
  const handleSerachChnage = (e, title) => {
    if (e.key === "Enter" || (e.keyCode === 13 && e.target.value.length > 0)) {
      handleSearchContacts(e, title);
    } else {
      debouncedSearchContacts(e, title);
    }
  };
  // helper function for debounce
  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={() => handleModal("Modal A")}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={() => handleModal("Modal B")}
          >
            US Contacts
          </button>
        </div>
        <ContactModal
          handleClose={handleClose}
          show={show}
          modalData={modalData}
          handleSerachChnage={handleSerachChnage}
          handleModal={handleModal}
          setModalData={setModalData}
          handleDeatilsModal={handleDeatilsModal}
        />
        <DetailsModal
          show={showDeatilsModal}
          handleClose={handleDetailsModalClose}
          modalData={modalData}
        />
      </div>
    </div>
  );
};

export default Problem2;
