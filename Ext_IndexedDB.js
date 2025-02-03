class XExt {
    getInfo() {
        return {
            id: 'IndexedDBExtension',
            name: '晓晓的IndexedDB存储',
            color1: '#34495e',
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
                {
                    opcode: 'openFileAsBinary',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '打开文件 [file] 并转换为二进制文本',
                    arguments: {
                        file: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'file',
                        },
                    },
                },
                // 新增功能
                {
                    opcode: 'clearDatabase',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '清空数据库 [dbName]',
                    arguments: {
                        dbName: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'ScratchDB',
                        },
                    },
                },
                {
                    opcode: 'checkDatabaseExists',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '数据库 [dbName] 是否存在？',
                    arguments: {
                        dbName: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'ScratchDB',
                        },
                    },
                },
                {
                    opcode: 'checkKeyExists',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '数据库 [dbName] 中的 [key] 是否存在？',
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
                    opcode: 'getAllDatabaseNames',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '获取所有数据库名称',
                    arguments: {},
                },
                {
                    opcode: 'exportDatabaseToJSON',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '导出数据库 [dbName] 的所有数据为JSON文件',
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

    // 获取所有数据
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
                        resolve(JSON.stringify(allData));
                    }
                };

                store.openCursor().onerror = function(event) {
                    reject('获取所有数据失败');
                };
            };
        });
    }

    // 清空数据库
    clearDatabase(args) {
        const request = indexedDB.open(args.dbName, 1);

        request.onsuccess = function(event) {
            const db = event.target.result;
            const transaction = db.transaction(['dataStore'], 'readwrite');
            const store = transaction.objectStore('dataStore');
            store.clear();
            console.log('数据库数据已清空');
        };

        request.onerror = function(event) {
            console.error('清空数据库失败:', event);
        };
    }

    // 判断数据库是否存在
    checkDatabaseExists(args) {
        const request = indexedDB.open(args.dbName, 1);
        return new Promise((resolve, reject) => {
            request.onsuccess = function() {
                resolve(true);
            };
            request.onerror = function() {
                resolve(false);
            };
        });
    }

    // 判断某个键是否存在
    checkKeyExists(args) {
        const request = indexedDB.open(args.dbName, 1);
        return new Promise((resolve, reject) => {
            request.onsuccess = function(event) {
                const db = event.target.result;
                const transaction = db.transaction(['dataStore'], 'readonly');
                const store = transaction.objectStore('dataStore');
                const requestData = store.get(args.key);

                requestData.onsuccess = function() {
                    resolve(requestData.result !== undefined);
                };

                requestData.onerror = function() {
                    resolve(false);
                };
            };
        });
    }

    // 获取所有数据库名称
    getAllDatabaseNames() {
        return new Promise((resolve, reject) => {
            const dbNames = [];
            const request = indexedDB.open('dummy', 1);
            
            request.onsuccess = function() {
                const db = request.result;
                const listRequest = indexedDB.databases();
                listRequest.onsuccess = function() {
                    dbNames.push(listRequest.result);
                    resolve(dbNames);
                };
            };

            request.onerror = function() {
                reject('获取数据库名称失败');
            };
        });
    }

    // 导出数据库为JSON
    exportDatabaseToJSON(args) {
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
                        const jsonBlob = new Blob([JSON.stringify(allData)], { type: 'application/json' });
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(jsonBlob);
                        link.download = `${args.dbName}_data.json`;
                        link.click();
                        resolve('导出成功');
                    }
                };

                store.openCursor().onerror = function(event) {
                    reject('导出数据库数据失败');
                };
            };
        });
    }

    // 打开本地文件并转换为二进制文本
    openFileAsBinary(args) {
        return new Promise((resolve, reject) => {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';

            fileInput.addEventListener('change', function(event) {
                const file = event.target.files[0];
                if (!file) return reject('未选择文件');

                const reader = new FileReader();

                reader.onload = function(loadEvent) {
                    const binaryText = loadEvent.target.result;
                    resolve(binaryText);
                };

                reader.onerror = function() {
                    reject('文件读取失败');
                };

                reader.readAsBinaryString(file);
            });

            fileInput.click();
        });
    }
}

Scratch.extensions.register(new XExt());
