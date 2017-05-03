document.getElementById('btnSend').onclick = function() {
    fetch('/action/send', {
        method: 'post',
        body: JSON.stringify({ message: document.getElementById('txtMessage').value }),
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