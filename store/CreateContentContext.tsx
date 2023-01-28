import { createContext, useContext, useState } from "react";

const initialValuesHelpContent = {
  appear: false,
  handleAppear: () => {},
};

const initialValuesSlateSaveContent = {
  save: "no",
  handleSave: () => {},
  loadContentBody: false,
  handleLoadContentBody: () => {},
};

const initialValuesCreateNew = {
  errors: {
    mainTitle: false,
    category: false,
    mainImage: false,
    contentBody1: false,
    contentBody2: false,
  },
  handleErrors: () => {},
  handleNoErrors: () => {},
};

const initialValuesEditOrCreateNew = {
  editNewID: "",
  handleEditNewID: () => {},
};

interface helpContentProps {
  appear: boolean;
  handleAppear: (option: boolean) => void;
}

interface slateSaveContentProps {
  save: string;
  handleSave: (value: string) => void;
  loadContentBody: boolean;
  handleLoadContentBody: (value: boolean) => void;
}

interface createNewProps {
  errors: {
    mainTitle: boolean;
    category: boolean;
    mainImage: boolean;
    contentBody1: boolean;
    contentBody2: boolean;
  };
  handleErrors: (error: string, option: boolean) => void;
  handleNoErrors: () => void;
}

interface editOrCreateNewProps {
  editNewID: string;
  handleEditNewID: (newID: string) => void;
}

const helpContent = createContext<helpContentProps>(initialValuesHelpContent);
const slateSaveContent = createContext<slateSaveContentProps>(
  initialValuesSlateSaveContent
);
const createNewContent = createContext<createNewProps>(initialValuesCreateNew);
const editOrCreateContent = createContext<editOrCreateNewProps>(
  initialValuesEditOrCreateNew
);

export const CreateContentContext = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [appear, setAppear] = useState(false);
  const [save, setSave] = useState("no");
  const [loadContentBody, setLoadContentBody] = useState(false);
  const [errors, setErrors] = useState({
    mainTitle: false,
    category: false,
    mainImage: false,
    contentBody1: false,
    contentBody2: false,
  });
  const [editNewID, setEditNewID] = useState("");

  const handleAppear = (option: boolean) => {
    setAppear(option);
  };

  const handleSave = (value: string) => {
    setSave(value);
  };

  const handleLoadContentBody = (value: boolean) => {
    setLoadContentBody(value);
  };

  const handleErrors = (error: string, option: boolean) => {
    setErrors({ ...errors, [error]: option });
  };

  const handleNoErrors = () => {
    setErrors({
      mainTitle: false,
      category: false,
      mainImage: false,
      contentBody1: false,
      contentBody2: false,
    });
  };

  const handleEditNewID = (newID: string) => {
    setEditNewID(newID);
  }
  
  return (
    <helpContent.Provider value={{ appear, handleAppear }}>
      <slateSaveContent.Provider
        value={{ save, handleSave, loadContentBody, handleLoadContentBody }}
      >
        <createNewContent.Provider
          value={{ errors, handleErrors, handleNoErrors }}
        >
          <editOrCreateContent.Provider
            value={{ editNewID, handleEditNewID }}
          >
            {children}
          </editOrCreateContent.Provider>
        </createNewContent.Provider>
      </slateSaveContent.Provider>
    </helpContent.Provider>
  );
};

export const useCreateContentContext = () => {
  return useContext(helpContent);
};

export const useSlateSaveContent = () => {
  return useContext(slateSaveContent);
};

export const useCreateNew = () => {
  return useContext(createNewContent);
};

export const useEditOrCreate = () => {
  return useContext(editOrCreateContent);
};
