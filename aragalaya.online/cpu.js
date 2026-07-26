
    let programCounter = 0;
    const CLOCK = 1000;
    let lastProgramCounter = 0;
    let cycles = 1;
    
    const program = [
      {
          address: [0,3],
          cycles: 40
      },
      {
          address: [1,15],
          cycles: 6
      },
      {
          address: [2],
          cycles: 8
      },
      {
          address: [3],
          cycles: 8
      },
      {
          address: [4],
          cycles: 8
      },
      {
          address: [5,9],
          cycles: 1
      },
      {
          address: [6,10],
          cycles: 1
      },
      {
          address: [7,11],
          cycles: 1
      },
      {
          address: [8,12],
          cycles: 1
      },
      {
          address: [5,9],
          cycles: 1
      },
      {
          address: [6,10],
          cycles: 1
      },
      {
          address: [7,11],
          cycles: 1
      },
      {
          address: [8,12],
          cycles: 1
      },
      {
          address: [5,9],
          cycles: 1
      },
      {
          address: [6,10],
          cycles: 1
      },
      {
          address: [7,11],
          cycles: 1
      },
      {
          address: [8,12],
          cycles: 1
      },
      {
          address: [5,9],
          cycles: 1
      },
      {
          address: [6,10],
          cycles: 1
      },
      {
          address: [7,11],
          cycles: 1
      },
      {
          address: [8,12],
          cycles: 1
      },
      {
          address: [13],
          cycles: 10,
          clean: () => {
            // if(memoStorage.size < MEMO_COUNT*4) {
            //   
            // }
          }
      },
      {
          address: [14],
          cycles: 4
      },
      {
          address: [1,15],
          cycles: 4
      },
      {
          address: [2],
          cycles: 8
      },
      {
          address: [3],
          cycles: 8
      },
    ];

    const addRange = (element) => {
      element.style.backgroundColor = 'yellow';
    }
    
    const removeRange = (element) => {
      element.style.backgroundColor = 'gray';
    }

    export const cpu = async () => {
      const currentInstruction = program[programCounter];
      if(programCounter !== lastProgramCounter) {
        cycles = typeof currentInstruction.cycles === 'function' 
          ? currentInstruction.cycles() 
          : currentInstruction.cycles;
      }
      let address = currentInstruction.address;
      address.forEach((add) => {
        let element = document.querySelectorAll('[step="'+ add + '"]');
        element.forEach(element => addRange(element));
      })
      await new Promise(resolve => setTimeout(resolve, CLOCK*currentInstruction.cycles));
      address.forEach(add => {
        let element = document.querySelectorAll('[step="'+ add + '"]');
        element.forEach(element => removeRange(element));
      })
      lastProgramCounter = programCounter;
      currentInstruction.clean && currentInstruction.clean();
      if(programCounter < program.length - 1) {
        programCounter++;
      } else {
        programCounter = 0;
      }
      cpu();
    };
    cpu();

    
