function onclick_btn_submit()
{
    var content = tinymce.activeEditor.getContent();
    document.getElementById('content').value = content;
    document.getElementById('contentForm').submit();
}

var chipCount = 0;
$(document).ready(function () {
    var chips = $('.chips');
    chips.material_chip();
    chips.on('chip.add', function (e, chip) {
        //chips.value = '';
        if (chipCount >= 30) {
            alert('태그를 더 이상 추가할 수 없습니다 !');
            chips.removeChild(chip);
            return;
        }
        chipCount = chipCount + 1;
    });
    chips.on('chip.delete', function (e, chip) {
        //chips.removeChild(chip);
        chipCount = chipCount - 1;
    });
    //chips.on('chip.select', function(e, chip) {
    //chips.removeClass('selected');
    //chips.addClass('selected');
    //});
    $("#calendar").addClass('active');
});