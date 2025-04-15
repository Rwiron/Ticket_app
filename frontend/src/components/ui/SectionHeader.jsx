// components/dashui/SectionHeader.jsx
import React, { useState } from "react";
import Button from "../../components/Button";
import CreateTicketModal from "./CreateTicketModal";

const SectionHeader = ({
  title,
  subtitle,
  actionButton,
  onActionClick,
  refreshButton,
  onRefreshClick,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (typeof onActionClick === "function") {
      onActionClick();
    } else {
      openModal();
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-gray-500 max-w-2xl">{subtitle}</p>
          )}
        </div>
        <div className="flex space-x-3">
          {refreshButton && (
            <Button
              title={refreshButton}
              buttonBg="bg-white text-blue-600 border border-blue-200 hover:bg-blue-50"
              onClick={onRefreshClick}
            />
          )}
          {actionButton && (
            <Button
              title={actionButton}
              buttonBg="bg-[#00b2ef] text-white hover:bg-[#00b2ef]/90"
              onClick={handleClick}
            />
          )}
        </div>
      </div>

      {/* Only render modal if no external click handler is provided */}
      {!onActionClick && (
        <CreateTicketModal
          open={isModalOpen}
          handleClose={closeModal}
          onSuccess={() => {
            if (typeof onRefreshClick === "function") {
              onRefreshClick();
            }
          }}
        />
      )}
    </>
  );
};

export default SectionHeader;
