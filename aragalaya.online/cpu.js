
    let programCounter = 0;
    const CLOCK = 1000;
    let lastProgramCounter = 0;
    let cycles = 1;
    
    const program = [
      {
          address: [0,12],
          cycles: 40
      },
      {
          address: [1],
          cycles: 16
      },
      {
          address: [2],
          cycles: 8
      },
      {
          address: [3,6],
          cycles: 6
      },
      {
          address: [4,7],
          cycles: 6
      },
      {
          address: [5,8],
          cycles: 6
      },
      {
          address: [6],
          cycles: 6
      },
      {
          address: [7],
          cycles: 6
      },
      {
          address: [8],
          cycles: 6
      },
      {
          address: [6],
          cycles: 6
      },
      {
          address: [7],
          cycles: 6
      },
      {
          address: [8],
          cycles: 6
      },
      {
          address: [6],
          cycles: 6
      },
      {
          address: [7],
          cycles: 6
      },
      {
          address: [8],
          cycles: 6
      },
      {
          address: [9],
          cycles: 30,
          clean: () => {
            // if(memoStorage.size < MEMO_COUNT*4) {
            //   
            // }
          }
      },
      {
          address: [10],
          cycles: 6
      },
      {
          address: [1,11],
          cycles: 6
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

    
