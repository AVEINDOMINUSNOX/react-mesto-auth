import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";

function EditAvatarPopup(props) {
    const avatarInput = useRef('');

    useEffect(() => {
        if (props.isOpen) {
            avatarInput.current.value = '';
        }
    }, [props.isOpen]);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.onSaveAvatar({
            avatar:avatarInput.current.value
        })
    };

    return (
        <PopupWithForm
            name="avatar-form-container"
            title="Обновить аватар"
            buttonTitle="Да"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                id="avatar-link-input"
                name="link-avatar"
                type="url"
                className="popup__input-field"
                placeholder="Ссылка на изображение"
                required
                ref={avatarInput}
            />
            <span className="avatar-link-input-error 
            popup__input-field-error 
            popup__input-field-error_type_visible"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;