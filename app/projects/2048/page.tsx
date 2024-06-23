'use client';

import { useCallback, useEffect, useState } from 'react';

const INIT_BOARD = [
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
];

const GameMain = () => {
  const [board, setBoard] = useState(INIT_BOARD);

  const blocks = {
    2: {
      number: 2,
      color: 'bg-[#EBDFC7]',
    },
    4: {
      number: 4,
      color: 'bg-[#EBDFC7]',
    },
    8: { number: 8, color: 'bg-[#EFB17C]' },
    16: { number: 16, color: 'bg-[#F59564]' },
    32: { number: 32, color: 'bg-[#F67D60]' },
    64: { number: 64, color: 'bg-[#F65C3C]' },
  };

  // useEffect(() => {
  //   setBlock();

  //   return () => {
  //     setBoard(INIT_BOARD);
  //   };
  // }, []);

  const getRandomIndex = () => {
    const rIdx = Math.floor(Math.random() * 4);
    const cIdx = Math.floor(Math.random() * 4);
    if (board[rIdx][cIdx] !== null) {
      return getRandomIndex();
    }
    return [rIdx, cIdx];
  };

  const getRandomBlock = () => {
    const blocks = [2, 4, 8];
    const randomIdx = Math.floor(Math.random() * blocks.length);
    return blocks[randomIdx];
  };

  const setBlock = () => {
    const [rIdx, cIdx] = getRandomIndex();
    const block = getRandomBlock();

    setBoard((prev) => {
      const newBoard = JSON.parse(JSON.stringify(prev));
      newBoard[rIdx][cIdx] = block;
      return newBoard;
    });
  };

  const keyupListener = useCallback(
    (e) => {
      const newBoard = JSON.parse(JSON.stringify(INIT_BOARD));
      if (e.key === 'ArrowUp') {
        for (let r = 0; r < 4; r++) {
          let idx = 0;
          let canCombine = true;
          for (let i = 0; i < 4; i++) {
            if (board[i][r] !== null) {
              if (
                canCombine &&
                idx !== 0 &&
                newBoard[idx - 1][r] === board[i][r]
              ) {
                newBoard[idx - 1][r] += board[i][r];
                canCombine = false;
              } else {
                newBoard[idx][r] = board[i][r];
                idx++;
              }
            }
          }
        }
      } else if (e.key === 'ArrowDown') {
        for (let r = 0; r < 4; r++) {
          let idx = 3;
          let canCombine = true;

          for (let i = 3; i >= 0; i--) {
            if (board[i][r] !== null) {
              if (
                canCombine &&
                idx !== 3 &&
                newBoard[idx + 1][r] === board[i][r]
              ) {
                newBoard[idx + 1][r] += board[i][r];
                canCombine = false;
              } else {
                newBoard[idx][r] = board[i][r];
                idx--;
              }
            }
          }
        }
      } else if (e.key === 'ArrowLeft') {
        for (let r = 0; r < 4; r++) {
          let idx = 0;
          let canCombine = true;
          for (let i = 0; i < 4; i++) {
            if (board[r][i] !== null) {
              if (
                canCombine &&
                idx !== 0 &&
                newBoard[r][idx - 1] === board[r][i]
              ) {
                newBoard[r][idx - 1] += board[r][i];
                canCombine = false;
              } else {
                newBoard[r][idx] = board[r][i];
                idx++;
              }
            }
          }
        }
      } else if (e.key === 'ArrowRight') {
        for (let r = 0; r < 4; r++) {
          let idx = 3;
          let canCombine = true;
          for (let i = 3; i >= 0; i--) {
            if (board[r][i] !== null) {
              if (
                canCombine &&
                idx !== 3 &&
                newBoard[r][idx + 1] === board[r][i]
              ) {
                newBoard[r][idx + 1] += board[r][i];
                canCombine = false;
              } else {
                newBoard[r][idx] = board[r][i];
                idx--;
              }
            }
          }
        }
      }
      setBoard(newBoard);
      setBlock();
    },
    [board]
  );

  useEffect(() => {
    window.addEventListener('keyup', keyupListener);
    return () => {
      window.removeEventListener('keyup', keyupListener);
    };
  }, [board]);

  return (
    <div className='flex flex-col items-center justify-center py-12'>
      <h1 className='text-4xl font-bold'>2048</h1>
      <button onClick={setBlock}>START</button>
      <div className='bg-[#BBAC9F] w-full max-w-[25rem] aspect-square rounded mt-12 p-2 grid col-span-4 gap-2 text-[#766D65]'>
        {board.map((row, rIdx) => (
          <div key={rIdx} className='flex gap-2'>
            {row.map((item, cIdx) => (
              <div
                key={'' + rIdx + cIdx}
                className={
                  'aspect-square rounded flex-1 flex justify-center items-center text-4xl font-bold' +
                  (item !== null ? ` ${blocks[item].color}` : ' bg-[#CCC0B3]')
                }
              >
                <span>{item}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameMain;
