import s from './Modal.module.scss';
import { Row } from "../Table/Table";
import close from '../../../public/close.png';
import Image from 'next/image';
import { useState } from 'react';

interface ModalProps {
  activeRow: Row | null;
  name: 'teachers' | 'disciplines' | 'activity';
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  titles: string[];
  columns: string[];
  setActiveRow: React.Dispatch<React.SetStateAction<Row | null>>;
  isMain: boolean;
}

const Modal: React.FC<ModalProps> = ({activeRow, name, setIsModal, titles, columns, setActiveRow, isMain = false}) => {
  const [inputs, setInputs] = useState(titles.map((title, index) => {
    return {
      id: index,
      title: title,
      value: activeRow ? activeRow[columns[index]] : '',
    }
  }))

  const getNewRow = (values: string[]) => {
    const newRow = {};
    if (values) {
      values.map((value, index) => {
        newRow[columns[index]] = value;
      })
    }

    return newRow;
  }
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(getNewRow(inputs.map(input => input.value)));

    const newRow = getNewRow(inputs.map(input => input.value));
    
    if (activeRow?.id) {

      // Добавить новый элемент в таблицу
      fetch(`/api/${name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRow),
      })
    } else {

      // Изменить имеющийся элемент
      fetch(name === 'teachers' ? '/api/teachers' : '/api/disciplines', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRow),
      })
    }

    setIsModal(false);
    setActiveRow(null);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(inputs => {
      const newInputs = inputs.map(input => {
        if (input.title === name) {
          return { ...input, value: value };
        }

        return input;
      });

      return newInputs;
    });
  }

  return (
    <>
      <div className={s.overlay} onClick={() => {
        setIsModal(false); 
        setActiveRow(null);
        }}></div>
      <div className={s.modal}>
          {activeRow?.id && <h2 className={s.title}>{inputs[0].value}</h2>}
          <form className={s.form} onSubmit={handleSubmit}>
            {inputs?.map((input, index) => (
              <div key={input.id}>
                <label>
                  {input.title}
                </label>
                <input value={input.value} onChange={handleChange} name={input.title} placeholder={input.title} className={s.input} type="text" />
              </div>
            ))}
            
            {!isMain && <div className={s.buttons}>
              <button className={s.buttonDelete} onClick={() => {
                setIsModal(false); 
                setActiveRow(null);
              }}>{activeRow?.id ? 'Удалить': 'Отменить'}</button>
              <button className={s.buttonAdd}>{activeRow?.id ? 'Сохранить изменения' : 'Добавить'}</button>
            </div>}
          </form>
          <Image className={s.close} src={close} alt='close' onClick={() => {
            setIsModal(false); 
            setActiveRow(null);
          }} />
      </div>
    </>
  );
}

export default Modal;
