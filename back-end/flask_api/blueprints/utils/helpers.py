from typing import List, Type, Callable
import flask
from models.base_model import BaseModel


class Helper:
    @staticmethod
    def assert_id_list(idList: List[str], Class: Type[BaseModel], className: str):
        if type(idList) != list:
            return 'Data <%s> must be a list / array.' % (className + 's'), 400
        for idItem in idList:
            if type(idItem) != str:
                return 'Not all data in <%s> is a string' % (className + 's'), 400

        for idItem in idList:
            item = Class.get_or_none(Class.id == idItem)
            if not item:
                return '%s \'%s\' does not exists' % (className, idItem), 400

        uniqueIdList = list(set(idList))
        if len(uniqueIdList) != len(idList):
            return 'There is duplicated data <%s>' % (className + 's'), 400
        return 'Success', 200
