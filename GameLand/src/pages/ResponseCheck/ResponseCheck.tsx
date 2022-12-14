import * as React from 'react';
import { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import Modal from '../../components/Modal';

const GreenRed = styled.div`
  #screen {
    width: 300px;
    height: 200px;
    text-align: center;
    user-select: none;
  }
  #screen.waiting {
    background-color: orange;
    margin: 0 auto;
  }
  #screen.ready {
    background-color: red;
    color: white;
  }
  #screen.now {
    background-color: green;
  }
`;

const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('Click to start π ');
  const [openModal, setOpenModal] = useState(false);
  const [result, setResult] = useState<number[]>([]);
  const timeout = useRef<number | null>(null);
  const startTime = useRef(0);
  const endTime = useRef(0);

  const onClickScreen = useCallback(() => {
    if (state === 'waiting') {
      timeout.current = window.setTimeout(() => {
        setState('now');
        setMessage('Now π’');
        startTime.current = new Date().getTime();
      }, Math.floor(Math.random() * 1000) + 2000); // 2μ΄~3μ΄ λλ€
      setState('ready');
      setMessage('Click on green π΄');
    } else if (state === 'ready') {
      // μ±κΈνκ² ν΄λ¦­
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      setState('waiting');
      setMessage('μ΄λ‘μμ λλ₯΄μλΌκ³ μπ Clickπ');
    } else if (state === 'now') {
      setOpenModal(true);
      // λ°μμλ μ²΄ν¬
      endTime.current = new Date().getTime();
      setState('waiting');
      setMessage('ν΄λ¦­νμ¬ μμνμΈμ.π');
      setResult(prevResult => {
        return [...prevResult, endTime.current - startTime.current];
      });
    }
  }, [state]);

  return (
    <>
      {' '}
      <div className="grid  justify-center">
        <div className="m-3  text-center text-3xl font-extrabold text-[#145d8a] text-shadow-xl">
          λ°μμλμ²΄ν¬ β
        </div>
        <div className=" grid  text-center font-extrabold">
          λΉμ μ λ°μ¬μ κ²½μ?
        </div>
        <div className="my-6 content-center">
          <GreenRed>
            <div id="screen" className={state} onClick={onClickScreen} />
          </GreenRed>
          <div className="mt-6 animate-bounce text-center text-xl text-[#124753] text-shadow-xl">
            {message}
          </div>
        </div>
      </div>
      {openModal && (
        <Modal
          responseResult={result.reduce((a, c) => a + c) / result.length}
          response={'λ°μμλμ²΄ν¬'}
        />
      )}
    </>
  );
};

export default ResponseCheck;
