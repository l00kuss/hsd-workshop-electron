const { app, BrowserWindow, Menu, Notification } = require('electron')
const { MyModule } = require('./mymodule')

let mainWindow = null

app.on('ready', () => {
  mainWindow = new BrowserWindow({ height: 600, width: 600 })
  mainWindow.loadFile('index.html')

  const template = [
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' }
      ]
    },
    {
      label: 'Ich bin ein Menüeintrag.',
      submenu: [
        {
          label: 'Ein spezieller Handler!',
          click () {

MyModule.getText();

            // notifications api within handler
            if (Notification.isSupported()) {
              const notification = new Notification({
                title: 'Hello World!',
                subtitle: `Schön Dich zu sehen.`,
                body: 'Wie war der Tag?',
                hasReply: true
              })

              notification.show()
            } else {
              console.log(`Hm, are notifications supported on this system?`)
            }
	        }
        },
        { type: 'separator' },
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})
