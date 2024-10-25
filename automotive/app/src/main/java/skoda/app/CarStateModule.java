package skoda.app;

import android.car.drivingstate.CarUxRestrictions;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

public class CarStateModule extends ReactContextBaseJavaModule {

    @Nullable
    private CarUxRestrictions mCurrentUxRestrictions;
    private Callback mSuccessCallback;

    public CarStateModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "CarState";
    }

    @ReactMethod
    public void getDrivingState(Callback successCallback) {
        //TODO:Detect car state
        successCallback.invoke(true);
    }
}
