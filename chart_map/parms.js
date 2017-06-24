//****************************************************
// �ݑ��ÁE���w�W�p parms.js
//  2017.6.11 1.0 �����J�����v����
//
//  �t�@�C���ǂݍ��݊֐�
//    fRead(fName, fun)
//  �Z���N�g�{�b�N�X�������֐�
//    �w�W�Z�b�g���F setIdxSet(idxSetList, idxSet)
//    �\����ʁF setDispType(dispTypeList,dispType)

//�֐� fRead*************************************************
//  �����F �t�@�C�����A�R�[���o�b�N�֐�
//  �R�[���o�b�N�֐��֓n�������F ����I�����ǂݍ��݃f�[�^
//  �icsv�t�@�C����ǂݍ��݁A1�s�������āA�z��Ƃ��ēn���j
function fRead(fName,fun) {
  console.log("fRead called fName: ",fName);
  var readLines = [];
  $('#msg').text('�t�@�C���ǂݍ��ݒ�');
  $.ajax(fName,
    { 
       dataType: 'text',
    })
      .done(function(data) {
        readLines = data.split("\n");
//      console.log(data);
// �ŏI�s���󔒍s�̏ꍇ�A��菜��20170125
        if (readLines[readLines.length-1]==""){
          readLines.pop();
        }
        $('#msg').text('');
        fun(readLines);
        })
      .fail(function(status, error) {
        console.log("ajax.fail", status.statusText, error);
        window.alert('�t�@�C���ǂݍ��݃G���[�ł��B����������m�F���A�ēx���s���Ă��������B');
      });
};

//*****************************************
//***
// 1.�\����ʂ̃Z���N�g�{�b�N�X�̒�`
//   html���̃Z���N�g�{�b�N�X��ID�FdispType
//   dispType, dispTypeName, dispTypeList�́A�Ăяo�����Œ�`����

function setDispType(dispTypeList, initdispType){
  for (key in dispTypeList){
    $(function(){
     var $option = '<option value ="' + key + '">' + dispTypeList[key] + '</option>';
     console.log($option);
     $('#dispType').append($option);
    });
  };
  $('#dispType').val(initdispType);
}

//***
// 2.�w�W�Z�b�g���̃Z���N�g�{�b�N�X�̒�`
//   html���̃Z���N�g�{�b�N�X��ID�FidxSet
//   idxSet, idxSetNameName, idxSetList�́A�Ăяo�����Œ�`����

function setIdxSet(idxSetList,initIdxSet){
  for (key in idxSetList){
    $(function(){
     var $option = '<option value ="' + key + '">' + idxSetList[key] + '</option>';
     console.log($option);
     $('#idxSet').append($option);
    });
  };
  $('#idxSet').val(initIdxSet);
  $('#idxSet').trigger('change');
}
