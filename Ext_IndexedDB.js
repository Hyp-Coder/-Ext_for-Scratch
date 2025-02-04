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
                    blockType: Scratch.BlockType.BOOLEAN,
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
                {
                    opcode: 'getDatabaseSize',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '获取数据库 [dbName] 的使用大小',
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
            
            request.onsuccess = function(event) {
                const db = event.target.result;
                const transaction = db.transaction(['dataStore'], 'readonly');
                const store = transaction.objectStore('dataStore');
                
                store.openCursor().onsuccess = function(event) {
                    const cursor = event.target.result;
                    if (cursor) {
                        dbNames.push(cursor.key);
                        cursor.continue();
                    } else {
                        resolve(dbNames);
                    }
                };

                store.openCursor().onerror = function() {
                    reject('无法获取数据库名称');
                };
            };
        });
    }

    // 导出数据库为JSON文件
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
                        const jsonData = JSON.stringify(allData);
                        const blob = new Blob([jsonData], { type: 'application/json' });
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(blob);
                        link.download = `${args.dbName}.json`;
                        link.click();
                        resolve('数据库导出成功');
                    }
                };

                store.openCursor().onerror = function(event) {
                    reject('导出数据库失败');
                };
            };
        });
    }

    // 获取数据库的大小
    getDatabaseSize(args) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(args.dbName, 1);

            request.onsuccess = function(event) {
                const db = event.target.result;
                const transaction = db.transaction(['dataStore'], 'readonly');
                const store = transaction.objectStore('dataStore');
                let size = 0;

                store.openCursor().onsuccess = function(event) {
                    const cursor = event.target.result;
                    if (cursor) {
                        size += cursor.value.length; // 简单估算每条数据的大小
                        cursor.continue();
                    } else {
                        resolve(size);
                    }
                };

                store.openCursor().onerror = function(event) {
                    reject('获取数据库大小失败');
                };
            };
        });
    }
}

Scratch.extensions.register(new XExt());


/*
# 晓晓的IndexedDB存储
晓晓的IndexedDB存储是一个为Scratch编程环境设计的扩展，它允许用户通过图形化编程接口来创建和操作IndexedDB数据库。

## 功能介绍

- **创建数据库**：允许用户指定数据库名称来创建一个新的IndexedDB数据库。
- **存储数据**：用户可以将键值对存储到指定的IndexedDB数据库中。

## 使用方法

1. 在Scratch编辑器中，加载此扩展。
2. 从扩展中拖出“创建数据库 [dbName]”积木到脚本区，替换[dbName]为你想要的数据库名称。
3. 使用“存储数据 [key] 为 [value] 到数据库 [dbName]”积木来存储数据，替换[key]和[value]为你想要存储的键和值，[dbName]替换为你的数据库名称。

## 许可证

晓晓的IndexedDB存储 © 2025 by 晓晓shine is licensed under CC BY-SA 4.0.

这意味着你可以自由地：

- **分享**：复制和分发作品。
- **改编**：修改原作品，并创作衍生作品。
- **商业使用**：你可以使用该作品进行商业活动。

在分享或改编作品时，你需要：

- **署名**：给出原作者的姓名或名称，以及作品的名称。
- **保持一致**：如果你分享或改编的作品是受CC BY-SA 4.0许可的，那么你的作品也必须使用相同的许可证。

## 隐私和贡献

我们尊重用户的隐私，并鼓励社区成员对本项目做出贡献。如果你有任何建议或发现任何问题，请通过适当的渠道与我们联系。
*/