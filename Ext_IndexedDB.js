class XExt {
    getInfo() {
      return {
        id: 'IndexedDBExtension', // ID确定唯一
        name: '晓晓的IndexedDB存储', // 扩展的名字
        color1: '#34495e', // 设置代码块的颜色
        blocks: [
          {
            opcode: 'createDatabase',
            blockType: Scratch.BlockType.COMMAND,
            text: '创建数据库 [dbName]',
            arguments: {
              dbName: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'ScratchDB',
              },
            },
          },
          {
            opcode: 'storeData',
            blockType: Scratch.BlockType.COMMAND,
            text: '存储数据 [key] 为 [value] 到数据库 [dbName]',
            arguments: {
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'defaultKey',
              },
              value: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'defaultValue',
              },
              dbName: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'ScratchDB',
              },
            },
          },
          {
            opcode: 'retrieveData',
            blockType: Scratch.BlockType.REPORTER,
            text: '获取数据库 [dbName] 中的 [key] 数据',
            arguments: {
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'defaultKey',
              },
              dbName: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'ScratchDB',
              },
            },
          },
          {
            opcode: 'updateData',
            blockType: Scratch.BlockType.COMMAND,
            text: '更新数据库 [dbName] 中的 [key] 为 [value]',
            arguments: {
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'defaultKey',
              },
              value: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'defaultValue',
              },
              dbName: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'ScratchDB',
              },
            },
          },
          {
            opcode: 'deleteData',
            blockType: Scratch.BlockType.COMMAND,
            text: '删除数据库 [dbName] 中的 [key]',
            arguments: {
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'defaultKey',
              },
              dbName: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'ScratchDB',
              },
            },
          },
          {
            opcode: 'deleteDatabase',
            blockType: Scratch.BlockType.COMMAND,
            text: '删除数据库 [dbName]',
            arguments: {
              dbName: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'ScratchDB',
              },
            },
          },
          {
            opcode: 'getAllData',
            blockType: Scratch.BlockType.REPORTER,
            text: '获取数据库 [dbName] 中的所有数据',
            arguments: {
              dbName: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'ScratchDB',
              },
            },
          },
        ],
      };
    }
  
    // 创建数据库
    createDatabase(args) {
      const request = indexedDB.open(args.dbName, 1);
  
      request.onupgradeneeded = function(event) {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('dataStore')) {
          db.createObjectStore('dataStore');
        }
      };
  
      request.onsuccess = function() {
        console.log('数据库创建成功');
      };
  
      request.onerror = function(event) {
        console.error('创建数据库失败:', event);
      };
    }
  
    // 存储数据
    storeData(args) {
      const request = indexedDB.open(args.dbName, 1);
  
      request.onupgradeneeded = function(event) {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('dataStore')) {
          db.createObjectStore('dataStore');
        }
      };
  
      request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(['dataStore'], 'readwrite');
        const store = transaction.objectStore('dataStore');
        store.put(args.value, args.key);
      };
  
      request.onerror = function(event) {
        console.error('存储数据失败:', event);
      };
    }
  
    // 获取数据
    retrieveData(args) {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(args.dbName, 1);
  
        request.onsuccess = function(event) {
          const db = event.target.result;
          const transaction = db.transaction(['dataStore'], 'readonly');
          const store = transaction.objectStore('dataStore');
          const requestData = store.get(args.key);
  
          requestData.onsuccess = function() {
            // 如果数据为空，返回 None
            resolve(requestData.result || 'None');
          };
  
          requestData.onerror = function() {
            reject('获取数据失败');
          };
        };
      });
    }
  
    // 更新数据
    updateData(args) {
      const request = indexedDB.open(args.dbName, 1);
  
      request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(['dataStore'], 'readwrite');
        const store = transaction.objectStore('dataStore');
        store.put(args.value, args.key);
      };
  
      request.onerror = function(event) {
        console.error('更新数据失败:', event);
      };
    }
  
    // 删除数据
    deleteData(args) {
      const request = indexedDB.open(args.dbName, 1);
  
      request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(['dataStore'], 'readwrite');
        const store = transaction.objectStore('dataStore');
        store.delete(args.key);
      };
  
      request.onerror = function(event) {
        console.error('删除数据失败:', event);
      };
    }
  
    // 删除数据库
    deleteDatabase(args) {
      const request = indexedDB.deleteDatabase(args.dbName);
  
      request.onsuccess = function() {
        console.log('数据库删除成功');
      };
  
      request.onerror = function(event) {
        console.error('删除数据库失败:', event);
      };
    }
  
    // 获取所有数据，并返回数组形式的字符串
    getAllData(args) {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(args.dbName, 1);
  
        request.onsuccess = function(event) {
          const db = event.target.result;
          const transaction = db.transaction(['dataStore'], 'readonly');
          const store = transaction.objectStore('dataStore');
          let allData = [];
  
          store.openCursor().onsuccess = function(event) {
            const cursor = event.target.result;
            if (cursor) {
              allData.push({ key: cursor.key, value: cursor.value });
              cursor.continue();
            } else {
              // 将所有数据转换为数组形式的字符串
              resolve(JSON.stringify(allData));
            }
          };
  
          store.openCursor().onerror = function(event) {
            reject('获取所有数据失败');
          };
        };
      });
    }
  }
  
  Scratch.extensions.register(new XExt());
  
  //晓晓的IndexedDB存储 © 2025 by 晓晓shine is licensed under CC BY-SA 4.0 