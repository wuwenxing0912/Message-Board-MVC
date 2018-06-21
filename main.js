! function() {
    var view = document.querySelector('#formAndMessageList')

    var model = {
        init: function() {
            var APP_ID = 'wbGEKwjkKqYviJcNpaQON5YD-gzGzoHsz';
            var APP_KEY = 'QNwxXOzQmf0UITzriLEQ3Jpp';

            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            })
        },
        read: function() {
            var query = new AV.Query('Test')
            return query.find()
        },
        save: function(nameContent, emailContent, messageContent) {
            var Test = AV.Object.extend('Test');
            var test = new Test();
            return test.save({
                name: nameContent,
                email: emailContent,
                message: messageContent
            })
        }
    }

    var controller = {
        view: null,
        model: null,
        messageList: null,
        myForm: null,
        init: function(view, model) {
            this.view = view
            this.model = model

            this.messageList = view.querySelector('#messageList')
            this.myForm = view.querySelector('#myForm')
            this.model.init()
            this.loadMessage()
            this.bindEvents()
        },
        loadMessage: function() {
            this.model.read().then((informations) => {
                var array = informations.map((item) => item.attributes)
                array.forEach((item) => {
                    var li = document.createElement('li')
                    li.innerText = `${item.name}(${item.email}):${item.message} `
                    messageList.appendChild(li)
                })
            })
        },
        bindEvents: function() {
            this.myForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveMessage()
            })
        },
        saveMessage: function() {
            var myForm = this.myForm
            var nameContent = myForm.querySelector('input[name=name]').value
            var emailContent = myForm.querySelector('input[name=email]').value
            var messageContent = myForm.querySelector('textarea').value

            this.model.save(nameContent, emailContent, messageContent)
                .then(function(object) {
                    var li = document.createElement('li')
                    li.innerText = `${object.attributes.name}:${object.attributes.message} ${object.attributes.email}`
                    messageList.appendChild(li)
                    myForm.querySelector('textarea').value = ''
                })
        }


    }
    controller.init(view, model)


}.call()