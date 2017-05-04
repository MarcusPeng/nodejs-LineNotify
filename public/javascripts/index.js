document.getElementById('btnSend').onclick = sendNotify;
document.getElementById('btnLogout').onclick = function() {
    window.location = '/action/logout';
}
document.getElementById('btnAdd').onclick = addSetting;
document.getElementById('imgSelectSticker').onclick = function(){
    modal.open();
}

let modal;

initial();

function sendNotify() {
    if (document.getElementById('txtMessage').value === '') {
        alert('Message can not be empty.');
        return;
    }

    let body = {};
    let selectedSticker = getSelectedSticker();
    body.message = document.getElementById('txtMessage').value;
    if (selectedSticker.hasSticker){
        body.stickerPackageId = selectedSticker.stickerPackageId;
        body.stickerId = selectedSticker.stickerId;
    }

    fetch('/action/send', {
        method: 'post',
        body: JSON.stringify(body),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function(res){
        return res.json();
    }).then(function(json) {
        alert(json.message);
    }).catch(function(err) {
        console.log('error', err);
        alert('error.');
    });
}

function addSetting() {
    if (document.getElementById('txtDateTime').value === '' || document.getElementById('txtMessage').value === '') {
        alert('Please input message and select schedule datetime.');
        return;
    }

    let body = {};
    let selectedSticker = getSelectedSticker();
    body.message = document.getElementById('txtMessage').value;
    body.imageThumbnail = '';
    body.imageFullsize = '';
    body.imageFile = '';
    body.scheduleTime = document.getElementById('txtDateTime').value + ':00';
    body.frequency = document.getElementById('ddlFrequency').value;
    body.stickerPackageId = selectedSticker.stickerPackageId;
    body.stickerId = selectedSticker.stickerId;

    fetch('/action/add-setting', {
        method: 'post',
        body: JSON.stringify(body),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function(res){
        if (res.status === 200) {
            window.location = '/';
        }
    }).catch(function(err) {
        console.log('error', err);
        alert('error.');
    });
}

function getSelectedSticker() {
    let result = { hasSticker: false, stickerPackageId: 0, stickerId: 0 };
    let selectedStickerName = document.getElementById('imgSelectSticker').getAttribute('selectedSticker');
    if (selectedStickerName !== '0.png'){
        let selectSitcker = selectedStickerName.replace('.jpg', '').split('_');
        result.hasSticker = true;
        result.stickerPackageId = Number(selectSitcker[0]);
        result.stickerId = Number(selectSitcker[1]);
    }
    return result;
}

function deleteSetting(settingId) {
    fetch('/action/delete-setting', {
        method: 'post',
        body: JSON.stringify({ 
            notifySettingId: settingId
        }),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function(res){
        if (res.status === 200) {
            window.location = '/';
        }
    }).catch(function(err) {
        console.log('error', err);
        alert('error.');
    });
}

function selectSticker(imgName) {
    let imgSelectSticker = document.getElementById('imgSelectSticker');
    imgSelectSticker.setAttribute('src', '/images/lineSticker/' + imgName);
    imgSelectSticker.setAttribute('selectedSticker', imgName);
    modal.close();
}

function initial() {
    new Picker(document.querySelector('.js-super-picker'), {
        date: new Date(),
        container: '.js-super-picker-container',
        format: 'YYYY-MM-DD HH:mm',
        text: {
            title: '選擇日期時間',
            cancel: '取消',
            confirm: '確認',
        },
        translate(type, text) {
            const suffixes = {
                year: '年',
                month: '月',
                day: '日',
                hour: '時',
                minute: '分',
            };

            return Number(text) + suffixes[type];
        },
    });

    modal = new tingle.modal({
        footer: false,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Close",
        cssClass: ['custom-class-1', 'custom-class-2'],
        onOpen: function() {
            // console.log('modal open');
        },
        onClose: function() {
            // console.log('modal closed');
        },
        beforeClose: function() {
            // here's goes some logic
            // e.g. save content before closing the modal
            return true; // close the modal
            return false; // nothing happens
        }
    });

    modal.setContent(document.getElementById('divSticker').innerHTML);
}




