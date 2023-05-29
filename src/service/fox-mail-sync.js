
import FoxMail from '../../models/fox-mail';

function createFoxMail(mailContent, mailSource = 'GMAIL') {
    const { messageId} = mailContent;
    return FoxMail.create({messageId, mailSource, mailContent});
  }
  
function updateFoxMail(mailContent, mailSource = 'GMAIL') {
    const { messageId} = mailContent;
    return FoxMail.update({mailSource, mailContent}, {
        where: {messageId}
    });
}
  
function getMailById(messageId) {
    return FoxMail.findOne({
        where: {messageId}
    });
}

function createOrUpdateMail(mailDetails) {
    return getMailById(mailDetails.messageId)
            .then(res => {
                if (res === null) {
                    return createFoxMail(mailDetails)
                    .then(createdMail => {
                        return {message: 'Mail created', messageId: mailDetails.messageId}
                    });
                } else {
                    return updateFoxMail(mailDetails)
                    .then(updatedMail => {
                        return {message: 'Mail updated', messageId: mailDetails.messageId}
                    });
                }
            }); 
}

export  {
    createFoxMail,
    updateFoxMail,
    getMailById,
    createOrUpdateMail
}
